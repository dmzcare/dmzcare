import { NextResponse } from "next/server";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  pickup?: string;
  destination?: string;
  datetime?: string;
  serviceType?: string;
  notes?: string;
};

export async function POST(request: Request) {
  let json: Body;
  try {
    json = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = json.name?.trim();
  const phone = json.phone?.trim();
  const pickup = json.pickup?.trim();
  const destination = json.destination?.trim();
  const datetime = json.datetime?.trim();

  if (!name || !phone || !pickup || !destination || !datetime) {
    return NextResponse.json(
      {
        ok: false,
        error: "Name, phone, pickup, destination, and appointment date/time are required.",
      },
      { status: 400 },
    );
  }

  console.info("[booking]", {
    name,
    phone,
    email: json.email?.trim(),
    pickup,
    destination,
    datetime,
    serviceType: json.serviceType?.trim(),
    notesLen: json.notes?.trim().length ?? 0,
  });

  return NextResponse.json({ ok: true });
}
