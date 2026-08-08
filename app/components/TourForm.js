"use client";

import { useState } from "react";
import { contact } from "@/app/lib/site-data";

export default function TourForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello New Dubai Nursery, I would like to arrange a visit.",
      `Parent: ${data.get("parent")}`,
      `Child's age: ${data.get("age")}`,
      `Preferred start: ${data.get("start") || "Not specified"}`,
      `Phone: ${data.get("phone")}`,
      `Message: ${data.get("message") || "No additional message"}`
    ].join("\n");
    window.open(`${contact.whatsappHref}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[32px] bg-white p-6 shadow-[0_24px_70px_rgba(24,61,54,.12)] sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Parent / guardian name"><input name="parent" type="text" placeholder="Your name" required /></Field>
        <Field label="Phone number"><input name="phone" type="tel" placeholder="+971" required /></Field>
        <Field label="Child’s age"><select name="age" defaultValue="" required><option value="" disabled>Select age</option><option>2 years</option><option>3 years</option><option>4 years</option><option>5 years</option><option>6 years</option></select></Field>
        <Field label="Preferred start"><input name="start" type="month" /></Field>
      </div>
      <Field label="Anything you’d like us to know?"><textarea name="message" rows="3" placeholder="Tell us how we can help" /></Field>
      <button type="submit" className="button button-coral mt-2 w-full sm:w-auto">Send via WhatsApp <span aria-hidden="true">↗</span></button>
      <p className="mt-4 text-xs leading-5 text-[var(--ink-muted)]">Submitting opens WhatsApp with your details ready to send. No information is stored by this website.</p>
      {sent && <p role="status" className="mt-4 rounded-xl bg-[var(--mint)] px-4 py-3 text-sm font-bold text-[var(--palm)]">Your message is ready in WhatsApp.</p>}
    </form>
  );
}

function Field({ label, children }) {
  return <label className="mb-4 block text-xs font-black uppercase tracking-[.12em] text-[var(--palm)]">{label}<span className="form-control mt-2 block">{children}</span></label>;
}
