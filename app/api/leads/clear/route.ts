import { NextResponse } from "next/server";
import { clearLeads } from "@/lib/leads-store";

export async function POST() {
  clearLeads();
  return NextResponse.json({ ok: true });
}
