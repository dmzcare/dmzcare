"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
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
          <label htmlFor="contact-name" className="block text-sm font-semibold text-dmz-dark">
            Full name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm text-dmz-dark outline-none ring-dmz-accent transition-colors focus:border-dmz-dark focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm font-semibold text-dmz-dark">
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm text-dmz-dark outline-none ring-dmz-accent transition-colors focus:border-dmz-dark focus:ring-2"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-semibold text-dmz-dark">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-dmz-border bg-dmz-white px-4 py-3 text-sm text-dmz-dark outline-none ring-dmz-accent transition-colors focus:border-dmz-dark focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-dmz-dark">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border border-dmz-border bg-dmz-white px-4 py-3 text-sm text-dmz-dark outline-none ring-dmz-accent transition-colors focus:border-dmz-dark focus:ring-2"
        />
      </div>

      {status === "success" ? (
        <p className="bg-dmz-soft px-4 py-3 text-sm font-medium text-dmz-dark" role="status">
          Thank you. Your message was sent. We will respond shortly.
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
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
