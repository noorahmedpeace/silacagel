// Client-direct upload endpoint for RFQ attachments. Uses Vercel Blob's
// client-upload protocol so files bypass the 4.5 MB serverless body limit.
//
// This hands out upload tokens for a public store, so it used to be free file
// hosting for anyone who POSTed to it. It now only serves this site's pages,
// only into rfq-uploads/, and only a few files per visitor per hour.
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { rateLimitOk } from "@/lib/rfq-store";
import { clientIp, isSameSiteOrigin } from "@/lib/request-guard";

const ALLOWED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
  "image/webp",
];

// Both upload forms allow 3 files per RFQ; 10 an hour leaves room for retries.
const UPLOADS_PER_HOUR = 10;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as HandleUploadBody | null;
  if (!body) return NextResponse.json({ error: "Bad request." }, { status: 400 });

  // The completion callback comes from Vercel's servers, not a browser, and is
  // verified by handleUpload's signature check, so only token requests are
  // limited to this site's pages.
  if (body.type === "blob.generate-client-token") {
    if (!isSameSiteOrigin(request.headers)) {
      return NextResponse.json({ error: "Uploads are only accepted from drygelworld.com." }, { status: 403 });
    }
    if (!(await rateLimitOk(clientIp(request.headers), UPLOADS_PER_HOUR, "upload"))) {
      return NextResponse.json({ error: "Too many uploads. Please try again later." }, { status: 429 });
    }
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("rfq-uploads/") || pathname.includes("..")) {
          throw new Error("Upload path not allowed.");
        }
        if (!/\.(pdf|docx|xlsx|png|jpe?g|webp)$/i.test(pathname)) {
          throw new Error("File type not allowed.");
        }
        return {
          allowedContentTypes: ALLOWED,
          maximumSizeInBytes: 20 * 1024 * 1024,
          addRandomSuffix: true,
          tokenPayload: "",
        };
      },
      onUploadCompleted: async () => {
        // Attachment URLs are attached to the inquiry by the form submission.
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed." },
      { status: 400 },
    );
  }
}
