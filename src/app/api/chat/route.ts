// POST /api/chat — grounded, streamed answer from the DryGelWorld knowledge base.
// Same-origin with the site, so no CORS needed.
import { after } from "next/server";
import { SYSTEM_PROMPT, businessInfo } from "@/lib/drybot/prompt";
import { retrieve } from "@/lib/drybot/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Msg = { role: string; content: string };

// Cerebras — OpenAI-compatible (same request/stream shape), much higher free limits than Groq.
const MODEL = process.env.CEREBRAS_MODEL || "gpt-oss-120b";
const LLM_URL = "https://api.cerebras.ai/v1/chat/completions";

// Fire a conversation log to a Google Sheet webhook (CHAT_LOG_URL), best-effort
// and time-bounded so it never slows the chat. No-op if the env var is unset.
async function logConversation(payload: {
  session: string; question: string; answer: string; sources: string[]; fellBack: boolean;
}) {
  const url = process.env.CHAT_LOG_URL;
  if (!url) return;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 1500);
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chat",
        time: new Date().toISOString(),
        session: payload.session,
        question: payload.question,
        answer: payload.answer.slice(0, 3000),
        sources: payload.sources,
        unanswered: payload.fellBack,
      }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
  } catch {
    /* logging is best-effort */
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { messages?: Msg[]; session?: string };
  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  const session = typeof body.session === "string" ? body.session : "";
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return new Response(JSON.stringify({ error: "no user message" }), { status: 400 });

  const chunks = retrieve(last.content, 3);
  const sources = [...new Set(chunks.map((c) => c.url))];
  const context = [
    businessInfo(),
    ...chunks.map((c, i) => `[Source ${i + 1} — ${c.url}]\n${c.text}`),
  ].join("\n\n");
  const userText =
    "SOURCE DOCUMENTS FROM drygelworld.com — answer factual questions using ONLY these, and name the page(s) you used:\n\n" +
    `${context}\n\n---\nVisitor question: ${last.content}`;
  const priorTurns = messages.slice(0, messages.length - 1).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: typeof m.content === "string" ? m.content : "",
  }));

  const payload = {
    model: MODEL,
    stream: true,
    temperature: 0.2,
    max_tokens: 2048,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...priorTurns, { role: "user", content: userText }],
  };

  // Log the conversation AFTER the response is sent — never block the chat on it.
  let logData: Parameters<typeof logConversation>[0] | null = null;
  let signalLogReady: () => void = () => {};
  const logReady = new Promise<void>((resolve) => {
    signalLogReady = resolve;
  });
  after(logReady.then(() => (logData ? logConversation(logData) : undefined)));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (o: unknown) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(o)}\n\n`));
      try {
        let gres: Response | null = null;
        for (let attempt = 0; ; attempt++) {
          gres = await fetch(LLM_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.CEREBRAS_API_KEY || process.env.GROQ_API_KEY || ""}`,
            },
            body: JSON.stringify(payload),
          });
          if (gres.ok && gres.body) break;
          const errText = await gres.text().catch(() => "");
          // Label follows LLM_URL, not the legacy provider: the stale "Groq"
          // prefix sent a debugging session hunting the wrong API key.
          console.error("LLM error:", gres.status, errText);
          if (gres.status === 429 && attempt < 2) {
            const m = errText.match(/try again in ([0-9.]+)s/);
            await new Promise((r) => setTimeout(r, m ? Math.min(6000, Math.ceil(parseFloat(m[1]) * 1000) + 300) : 3000));
            continue;
          }
          send({
            text:
              gres.status === 429
                ? "We're getting a lot of requests right now — please try again in a few seconds. Meanwhile you can reach our sales team on WhatsApp/phone +92 333 022 3337 or email sales@drygelworld.com."
                : "I'm having a brief technical hiccup. Please try again shortly, or contact sales@drygelworld.com / WhatsApp +92 333 022 3337.",
          });
          send({ done: true });
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          // Log the question even when rate-limited, so tracking still works.
          logData = { session, question: last.content, answer: gres.status === 429 ? "(rate-limited — fallback shown)" : "(error — fallback shown)", sources: [], fellBack: true };
          return; // finally closes the stream
        }

        let answer = "";
        let buf = "";
        const reader = gres.body!.getReader();
        const dec = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() || "";
          for (const line of lines) {
            const s = line.trim();
            if (!s.startsWith("data:")) continue;
            const p = s.slice(5).trim();
            if (p === "[DONE]") continue;
            try {
              const delta = JSON.parse(p).choices?.[0]?.delta?.content || "";
              if (delta) {
                answer += delta;
                send({ text: delta });
              }
            } catch {
              // ignore keep-alive / partial lines
            }
          }
        }
        if (sources.length && answer.trim()) send({ sources });
        send({ done: true });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        const fellBack = /couldn't find this information in the DryGelWorld knowledge base/i.test(answer);
        logData = { session, question: last.content, answer, sources, fellBack };
      } catch (err) {
        console.error("chat error:", err);
        send({ error: true });
      } finally {
        controller.close();
        signalLogReady(); // fire the (non-blocking) log after the response
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
