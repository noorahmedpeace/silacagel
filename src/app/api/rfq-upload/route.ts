// Client-direct upload endpoint for RFQ attachments. Uses Vercel Blob's
// client-upload protocol so files bypass the 4.5 MB serverless body limit.
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const ALLOWED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
  "image/webp",
];

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
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
