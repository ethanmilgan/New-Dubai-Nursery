export default function SectionHeading({ eyebrow, title, copy, align = "left", light = false }) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-[var(--sun)]" : "text-[var(--coral)]"}`}>{eyebrow}</p>}
      <h2 className={`font-display text-[clamp(2.6rem,5.4vw,5rem)] leading-[.98] tracking-[-.045em] ${light ? "text-white" : "text-[var(--palm)]"}`}>{title}</h2>
      {copy && <p className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${centered ? "mx-auto" : ""} ${light ? "text-white/70" : "text-[var(--ink-muted)]"}`}>{copy}</p>}
    </div>
  );
}
