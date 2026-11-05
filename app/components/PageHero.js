import Image from "next/image";

export default function PageHero({ eyebrow, title, copy, image, alt, imagePosition = "center", fitImage = false, children }) {
  return (
    <section className="relative overflow-hidden bg-[var(--palm)] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-14 lg:py-24">
      <div className="decor-dots absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow text-[var(--sun)]">{eyebrow}</p>
          <h1 className="font-display text-[clamp(3.3rem,7vw,6.6rem)] leading-[.92] tracking-[-.055em]">{title}</h1>
          {copy && <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">{copy}</p>}
          {children}
        </div>
        <div className={fitImage ? "relative aspect-[16/9] rounded-3xl bg-white/5" : "relative min-h-[330px] overflow-hidden rounded-[42px_42px_140px_42px] sm:min-h-[460px]"}>
          <Image src={image} alt={alt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className={fitImage ? "object-contain p-3" : "object-cover"} style={{ objectPosition: imagePosition }} />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
        </div>
      </div>
    </section>
  );
}
