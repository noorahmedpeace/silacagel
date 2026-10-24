"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { deleteInquiry, rateLimitOk, updateInquiry, type InquiryStatus } from "@/lib/rfq-store";
import { adminSessionToken, clientIp, isAdminSession, safeEqual } from "@/lib/request-guard";

// Login: constant-time comparison, a per-IP attempt limit, and a cookie that
// holds a session token derived from the key, never the key itself (it used
// to store the raw key for 30 days).
export async function authenticateAdmin(formData: FormData) {
  const key = String(formData.get("key") ?? "").slice(0, 200);
  const adminKey = process.env.RFQ_ADMIN_KEY?.trim();
  const ip = clientIp(await headers());
  if (!(await rateLimitOk(ip, 10, "admin-login"))) redirect("/admin/inquiries");
  if (adminKey && safeEqual(key, adminKey)) {
    const cookieStore = await cookies();
    cookieStore.set("rfq_admin", adminSessionToken(adminKey), {
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
  const cookieStore = await cookies();
  if (!isAdminSession(cookieStore.get("rfq_admin")?.value)) {
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

// Permanently remove an inquiry (junk / test / bot). Admin-guarded + irreversible.
export async function removeInquiry(id: string) {
  await assertAdmin();
  return deleteInquiry(id);
}
