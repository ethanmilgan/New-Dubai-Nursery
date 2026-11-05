"use client";

import { useState } from "react";
import { contact as defaultContact } from "@/app/lib/site-data";

export default function TourForm({ contact = defaultContact }) {
  const [preparedVia, setPreparedVia] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const start = data.get("start");
    const preferredStart = start
      ? new Date(`${start}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" })
      : "Not specified";
    const message = [
      "Hello New Dubai Nursery, I would like to arrange a visit.",
      `Parent: ${data.get("parent")}`,
      `Child's age: ${data.get("age")}`,
      `Preferred start: ${preferredStart}`,
      `Phone: ${data.get("phone")}`,
      `Message: ${data.get("message") || "No additional message"}`
    ].join("\n");
    const delivery = event.nativeEvent.submitter?.value === "email" ? "email" : "whatsapp";
    if (delivery === "email") {
      const subject = encodeURIComponent("New Dubai Nursery visit enquiry");
      const body = encodeURIComponent(message.replace(/\n/g, "\r\n"));
      window.location.href = `${contact.emailHref || defaultContact.emailHref}?subject=${subject}&body=${body}`;
    } else {
      window.open(`${contact.whatsappHref}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    }
    setPreparedVia(delivery);
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
      <div className="mt-2 flex flex-wrap gap-3">
        <button type="submit" name="delivery" value="whatsapp" className="button button-coral w-full sm:w-auto">Send via WhatsApp <span aria-hidden="true">↗</span></button>
        <button type="submit" name="delivery" value="email" className="button button-outline w-full sm:w-auto">Send via Email <span aria-hidden="true">↗</span></button>
      </div>
      <p className="mt-4 text-xs leading-5 text-[var(--ink-muted)]">Choose WhatsApp or email to open your app with your details ready to send. No information is stored by this website.</p>
      {preparedVia && <p role="status" className="mt-4 rounded-xl bg-[var(--mint)] px-4 py-3 text-sm font-bold text-[var(--palm)]">{preparedVia === "email" ? "Your email app should open with your details. Send the email there to complete your enquiry." : "Your message is ready in WhatsApp."}</p>}
    </form>
  );
}

function Field({ label, children }) {
  return <label className="mb-4 block text-xs font-black uppercase tracking-[.12em] text-[var(--palm)]">{label}<span className="form-control mt-2 block">{children}</span></label>;
}
