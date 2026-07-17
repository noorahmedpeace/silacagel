// One-time OAuth helper: opens the consent screen, catches the redirect on a
// throwaway localhost server, swaps the code for a refresh token, and writes it
// back into .env.local. Run: node scripts/ads-get-refresh-token.mjs
//
// Desktop-app ("installed") clients are allowed a loopback redirect, so nothing
// needs to be registered in the Cloud console and no secret leaves this machine.
import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";

const ENV_PATH = new URL("../.env.local", import.meta.url);
const SCOPE = "https://www.googleapis.com/auth/adwords";

function readEnv() {
  const text = readFileSync(ENV_PATH, "utf8");
  const get = (key) => text.match(new RegExp(`^${key}=(.*)$`, "m"))?.[1]?.trim() ?? "";
  return { text, clientId: get("GOOGLE_ADS_CLIENT_ID"), clientSecret: get("GOOGLE_ADS_CLIENT_SECRET") };
}

const { text, clientId, clientSecret } = readEnv();
if (!clientId || !clientSecret) {
  console.error("GOOGLE_ADS_CLIENT_ID / GOOGLE_ADS_CLIENT_SECRET missing from .env.local");
  process.exit(1);
}

// Port 0 = let the OS pick a free one; the redirect URI must match exactly, so
// build it only after the server is actually listening.
const server = createServer();
server.listen(0, "127.0.0.1", () => {
  const redirectUri = `http://127.0.0.1:${server.address().port}`;
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: SCOPE,
      // Google only returns a refresh token on the first consent unless both of
      // these are set — without them a re-run yields an access token only.
      access_type: "offline",
      prompt: "consent",
    });

  console.log("\nBrowser khul raha hai. Apne Google account se sign in karo\n(wahi jo test user add kiya: noorahmedkhan543@gmail.com)\n");
  console.log("Agar browser khud na khule to ye poora link copy karke kholo:\n");
  console.log(authUrl + "\n");
  // NOT `cmd /c start` — cmd treats the URL's & as a command separator and
  // truncates it at the first one, which strips response_type and earns a
  // "Required parameter is missing" from Google. PowerShell takes the whole
  // single-quoted string as one argument.
  spawn("powershell", ["-NoProfile", "-Command", "Start-Process", `'${authUrl}'`], {
    stdio: "ignore",
    detached: true,
  }).unref();
});

server.on("request", async (req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  const reply = (msg) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<html><body style="font-family:system-ui;padding:40px"><h2>${msg}</h2><p>Ye tab band kar sakte ho.</p></body></html>`);
  };

  if (error) {
    reply("Authorization cancel ho gayi — script dobara chalao.");
    console.error("\nAuthorization failed:", error);
    server.close();
    process.exit(1);
  }
  if (!code) return reply("Waiting…");

  reply("Ho gaya! Refresh token save kar diya.");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `http://127.0.0.1:${server.address().port}`,
      grant_type: "authorization_code",
    }),
  });

  const data = await tokenRes.json();
  server.close();

  if (!data.refresh_token) {
    console.error("\nKoi refresh token nahi mila. Google ka jawab:", JSON.stringify(data, null, 2));
    console.error("\nAgar 'invalid_grant' hai to consent screen par apna email test user mein add karo.");
    process.exit(1);
  }

  writeFileSync(
    ENV_PATH,
    text.replace(/^GOOGLE_ADS_REFRESH_TOKEN=.*$/m, `GOOGLE_ADS_REFRESH_TOKEN=${data.refresh_token}`),
    "utf8",
  );
  console.log("\n✅ Refresh token .env.local mein save ho gaya. Ab kuch aur karne ki zaroorat nahi.\n");
  process.exit(0);
});
