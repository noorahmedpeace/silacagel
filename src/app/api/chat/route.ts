// POST /api/chat — grounded, streamed answer from the DryGelWorld knowledge base.
// Same-origin with the site, so no CORS needed.
import { SYSTEM_PROMPT, businessInfo } from "@/lib/drybot/prompt";
import { retrieve } from "@/lib/drybot/retrieve";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Msg = { role: string; content: string };

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { messages?: Msg[] };
  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return new Response(JSON.stringify({ error: "no user message" }), { status: 400 });

  const chunks = retrieve(last.content, 5);
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
    max_tokens: 1024,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...priorTurns, { role: "user", content: userText }],
  };

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (o: unknown) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(o)}\n\n`));
      try {
        let gres: Response | null = null;
        for (let attempt = 0; ; attempt++) {
          gres = await fetch(GROQ_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
            body: JSON.stringify(payload),
          });
          if (gres.ok && gres.body) break;
          const errText = await gres.text().catch(() => "");
          console.error("Groq error:", gres.status, errText);
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
          controller.close();
          return;
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
      } catch (err) {
        console.error("chat error:", err);
        send({ error: true });
      } finally {
        controller.close();
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
