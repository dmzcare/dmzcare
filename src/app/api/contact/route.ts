import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function POST(request: Request) {
  let json: Body;
  try {
    json = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = json.name?.trim();
  const email = json.email?.trim();
  const phone = json.phone?.trim();
  const message = json.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // Hook for email/CRM integration (e.g. Resend, SendGrid, Zapier).
  console.info("[contact]", { name, email, phone, messageLength: message.length });

  return NextResponse.json({ ok: true });
}
