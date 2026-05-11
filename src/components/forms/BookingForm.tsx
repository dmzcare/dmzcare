"use client";

import { useState } from "react";

const serviceTypes = [
  { value: "", label: "Select service type" },
  { value: "ambulatory", label: "Ambulatory / escorted" },
  { value: "wheelchair", label: "Wheelchair accessible" },
  { value: "bariatric", label: "Bariatric / extra assistance (note in details)" },
  { value: "stretcher", label: "Stretcher (if offered; confirm by phone)" },
  { value: "recurring", label: "Recurring appointment series" },
  { value: "other", label: "Other / not sure" },
];

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      pickup: (form.elements.namedItem("pickup") as HTMLInputElement).value,
      destination: (form.elements.namedItem("destination") as HTMLInputElement).value,
      datetime: (form.elements.namedItem("datetime") as HTMLInputElement).value,
      serviceType: (form.elements.namedItem("serviceType") as HTMLSelectElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="book-name" className="block text-sm font-semibold text-dmz-dark">
            Rider or contact name
          </label>
          <input
            id="book-name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="book-phone" className="block text-sm font-semibold text-dmz-dark">
            Phone
          </label>
          <input
            id="book-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="book-email" className="block text-sm font-semibold text-dmz-dark">
          Email <span className="font-normal text-dmz-text">(optional)</span>
        </label>
        <input
          id="book-email"
          name="email"
          type="email"
          autoComplete="email"
          className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="book-pickup" className="block text-sm font-semibold text-dmz-dark">
          Pickup address
        </label>
        <input
          id="book-pickup"
          name="pickup"
          required
          autoComplete="street-address"
          placeholder="Street, city, unit / bay instructions"
          className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
        />
      </div>

      <div>
        <label htmlFor="book-destination" className="block text-sm font-semibold text-dmz-dark">
          Destination
        </label>
        <input
          id="book-destination"
          name="destination"
          required
          placeholder="Facility name or address"
          className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="book-datetime" className="block text-sm font-semibold text-dmz-dark">
            Appointment date &amp; time
          </label>
          <input
            id="book-datetime"
            name="datetime"
            required
            placeholder="e.g. March 12, 2:30 PM, or use notes"
            className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="book-service" className="block text-sm font-semibold text-dmz-dark">
            Service type
          </label>
          <select
            id="book-service"
            name="serviceType"
            required
            defaultValue=""
            className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
          >
            {serviceTypes.map((o) => (
              <option key={o.value || "empty"} value={o.value} disabled={o.value === ""}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="book-notes" className="block text-sm font-semibold text-dmz-dark">
          Mobility, companion, or special instructions
        </label>
        <textarea
          id="book-notes"
          name="notes"
          rows={4}
          placeholder="Wheelchair type, oxygen, cognitive support, preferred entrance, etc."
          className="mt-2 w-full resize-y border border-dmz-border bg-dmz-white px-4 py-3 text-sm outline-none ring-dmz-accent focus:border-dmz-dark focus:ring-2"
        />
      </div>

      {status === "success" ? (
        <p className="bg-dmz-soft px-4 py-3 text-sm font-medium text-dmz-dark" role="status">
          Request received. Our team will follow up to confirm your ride details.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center bg-dmz-accent px-8 py-3.5 text-sm font-semibold text-dmz-dark transition-colors hover:bg-[#b8e002] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Submit booking request"}
      </button>
      <p className="text-xs leading-relaxed text-dmz-text">
        For emergencies, call <span className="font-semibold text-dmz-dark">911</span>. This form is
        for non-emergency transportation requests only.
      </p>
    </form>
  );
}
