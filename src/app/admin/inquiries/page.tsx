import type { Metadata } from "next";
import { cookies } from "next/headers";
import { listInquiries } from "@/lib/rfq-store";
import { authenticateAdmin } from "./actions";
import { InquiriesTable } from "./inquiries-table";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "RFQ Inquiries | Internal",
  robots: { index: false, follow: false },
};

// Inquiry data changes at request time, never prerender.
export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const adminKey = process.env.RFQ_ADMIN_KEY?.trim();
  const cookieStore = await cookies();
  const authed = Boolean(adminKey) && cookieStore.get("rfq_admin")?.value === adminKey;

  if (!authed) {
    return (
      <main className={styles.page}>
        <form className={styles.login} action={authenticateAdmin}>
          <h1>Internal dashboard</h1>
          <p>Enter the access key to view RFQ inquiries.</p>
          <input name="key" type="password" placeholder="Access key" autoFocus />
          <button type="submit">Enter</button>
        </form>
      </main>
    );
  }

  const inquiries = await listInquiries();

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <h1>RFQ Inquiries ({inquiries.length})</h1>
        <p>Every quotation request submitted on drygelworld.com, newest first.</p>
      </header>
      <InquiriesTable initial={inquiries} />
    </main>
  );
}
