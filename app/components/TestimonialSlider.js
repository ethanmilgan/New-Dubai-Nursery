"use client";

import { useEffect, useId, useState } from "react";
import { testimonials as defaultTestimonials } from "@/app/lib/site-data";

export default function TestimonialSlider({ testimonials = defaultTestimonials }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const quoteId = useId();

  useEffect(() => {
    if (expanded) return;
    const interval = window.setInterval(() => setActive((value) => (value + 1) % testimonials.length), 7000);
    return () => window.clearInterval(interval);
  }, [testimonials.length, expanded]);

  const item = testimonials[active % testimonials.length];

  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="font-display text-8xl leading-[.5] text-[var(--sun)]" aria-hidden="true">“</div>
      <blockquote id={quoteId} className={expanded ? "mt-8 whitespace-pre-line text-left text-base leading-8 text-white sm:text-lg" : "mt-8 font-display text-[clamp(1.7rem,3.6vw,3.2rem)] leading-[1.25] tracking-[-.025em] text-white"}>{expanded ? item.fullQuote : item.quote}</blockquote>
      {item.fullQuote && item.fullQuote !== item.quote && <button type="button" aria-expanded={expanded} aria-controls={quoteId} onClick={() => setExpanded(value => !value)} className="mt-5 rounded px-3 py-2 text-sm font-bold text-white underline underline-offset-4 hover:text-[var(--sun)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{expanded ? "Show Less" : "Read Full Testimonial"}</button>}
      <p className="mt-8 text-sm font-bold text-white">{item.name}</p>
      <p className="text-xs text-white/55">{item.role}</p>
      <div className="mt-8 flex justify-center gap-2.5" role="group" aria-label="Choose testimonial">
        {testimonials.map((testimonial, index) => (
          <button key={testimonial.name} type="button" onClick={() => {setActive(index); setExpanded(false);}} className={`h-2.5 rounded-full transition-all ${active === index ? "w-8 bg-[var(--sun)]" : "w-2.5 bg-white/30 hover:bg-white/60"}`} aria-label={`Show testimonial ${index + 1}`} aria-current={active === index} />
        ))}
      </div>
    </div>
  );
}
