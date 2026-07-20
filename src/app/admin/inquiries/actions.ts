"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateInquiry, type InquiryStatus } from "@/lib/rfq-store";

export async function authenticateAdmin(formData: FormData) {
  const key = String(formData.get("key") ?? "");
  const adminKey = process.env.RFQ_ADMIN_KEY?.trim();
  if (adminKey && key === adminKey) {
    const cookieStore = await cookies();
    cookieStore.set("rfq_admin", key, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/admin",
    });
  }
  redirect("/admin/inquiries");
}

async function assertAdmin() {
  const adminKey = process.env.RFQ_ADMIN_KEY?.trim();
  const cookieStore = await cookies();
  if (!adminKey || cookieStore.get("rfq_admin")?.value !== adminKey) {
    throw new Error("Not authorized.");
  }
}

export async function setInquiryStatus(id: string, status: InquiryStatus) {
  await assertAdmin();
  return updateInquiry(id, { status });
}

export async function addInquiryNote(id: string, note: string) {
  await assertAdmin();
  return updateInquiry(id, { addNote: note });
}

// Set (YYYY-MM-DD) or clear ("") the staff follow-up date. Validation is
// enforced again in updateInquiry so a malformed value can never reach storage.
export async function setInquiryFollowUp(id: string, date: string) {
  await assertAdmin();
  return updateInquiry(id, { followUpDate: date });
}
