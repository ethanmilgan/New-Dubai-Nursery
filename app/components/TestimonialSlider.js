"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/app/lib/site-data";

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActive((value) => (value + 1) % testimonials.length), 7000);
    return () => window.clearInterval(interval);
  }, []);

  const item = testimonials[active];

  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="font-display text-8xl leading-[.5] text-[var(--sun)]" aria-hidden="true">“</div>
      <blockquote className="mt-8 font-display text-[clamp(1.7rem,3.6vw,3.2rem)] leading-[1.25] tracking-[-.025em] text-white">{item.quote}</blockquote>
      <p className="mt-8 text-sm font-bold text-white">{item.name}</p>
      <p className="text-xs text-white/55">{item.role}</p>
      <div className="mt-8 flex justify-center gap-2.5" role="group" aria-label="Choose testimonial">
        {testimonials.map((testimonial, index) => (
          <button key={testimonial.name} type="button" onClick={() => setActive(index)} className={`h-2.5 rounded-full transition-all ${active === index ? "w-8 bg-[var(--sun)]" : "w-2.5 bg-white/30 hover:bg-white/60"}`} aria-label={`Show testimonial ${index + 1}`} aria-current={active === index} />
        ))}
      </div>
    </div>
  );
}
