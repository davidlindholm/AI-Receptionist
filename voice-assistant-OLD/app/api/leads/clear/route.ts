import { NextResponse } from "next/server";
import { clearLeads } from "@/lib/leads-store";

export async function POST() {
  await clearLeads();
  return NextResponse.json({ ok: true });
}
