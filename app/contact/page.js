import Image from "next/image";
import PageHero from "@/app/components/PageHero";
import TourForm from "@/app/components/TourForm";
import SectionHeading from "@/app/components/SectionHeading";
import { contact } from "@/app/lib/site-data";

export const metadata = {
  title: "Contact & Visit",
  description: "Contact New Dubai Nursery and plan a visit to our location in Al Hudaiba, Bur Dubai."
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Contact us" title={<>Let’s start a<br /><em className="font-normal text-[var(--sun)]">conversation</em></>} copy="Whether you are exploring nursery for the first time or ready to apply, our team is here to listen and help." image="/images/Untitled-1.jpg" alt="Children enjoying different learning experiences at New Dubai Nursery">
        <div className="mt-8 flex flex-wrap gap-3"><a href={contact.whatsappHref} className="button button-sun" target="_blank" rel="noreferrer">WhatsApp us <span aria-hidden="true">↗</span></a><a href={contact.phoneHref} className="button border border-white/30 text-white">Call {contact.phone}</a></div>
      </PageHero>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32" id="visit">
        <div className="mx-auto grid max-w-[1300px] items-start gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Arrange a visit" title={<>See if it feels<br />like <em className="font-normal text-[var(--coral)]">their place</em></>} copy="Share a few details and WhatsApp will open with your visit request ready to send." />
            <div className="mt-9 rounded-[28px] border border-[var(--coral)]/20 bg-[#f7d7cd] p-6">
              <p className="text-xs font-black uppercase tracking-[.15em] text-[var(--coral-dark)]">Visit New Dubai Nursery</p>
              <address className="mt-3 text-sm not-italic leading-7 text-[var(--ink-muted)]">{contact.address}</address>
              <a href={contact.mapsHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--palm)] underline decoration-[var(--coral)]/40 underline-offset-4">Get directions <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <TourForm />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading align="center" eyebrow="Talk to our team" title={<>Choose what works<br /><em className="font-normal text-[var(--coral)]">for you</em></>} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard icon="☎" label="Call" value={contact.phone} href={contact.phoneHref} />
            <ContactCard icon="◉" label="WhatsApp" value={contact.whatsapp} href={contact.whatsappHref} external />
            <ContactCard icon="✉" label="Email" value={contact.email} href={contact.emailHref} />
            <ContactCard icon="◎" label="Instagram" value={contact.instagram} href={contact.instagramHref} external />
          </div>
        </div>
      </section>

      <section className="bg-[var(--palm)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1250px] items-center gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="eyebrow text-[var(--sun)]">Find us</p>
            <h2 className="font-display text-[clamp(2.7rem,5.2vw,4.8rem)] leading-[.98] tracking-[-.045em]">Visit our Al Hudaiba nursery</h2>
            <address className="mt-6 max-w-md text-base not-italic leading-8 text-white/70">{contact.address}</address>
            <a href={contact.mapsHref} target="_blank" rel="noreferrer" className="button button-sun mt-8">Open in Google Maps <span aria-hidden="true">↗</span></a>
          </div>
          <div className="overflow-hidden rounded-[36px] bg-white shadow-2xl">
            <iframe
              src={contact.mapsEmbedHref}
              title="Google Map showing New Dubai Nursery in Al Hudaiba, Dubai"
              className="h-[430px] w-full border-0 sm:h-[520px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--mint)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1250px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
          <div className="relative min-h-[500px] overflow-hidden rounded-[40px_130px_40px_40px]">
            <Image src="/images/ssss-scaled-1500x1130.jpg" alt="Children enjoying outdoor nursery activities" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow text-[var(--coral)]">What happens next?</p>
            <h2 className="font-display text-[clamp(2.7rem,5.2vw,4.8rem)] leading-[.98] tracking-[-.045em] text-[var(--palm)]">A warm welcome, from the very first message</h2>
            <div className="mt-8 space-y-6">
              <NextStep number="1" title="We’ll listen" copy="Tell us about your child, your timing and what matters most to your family." />
              <NextStep number="2" title="We’ll share details" copy="Our team will explain availability, timings, the appropriate age group and how to find us." />
              <NextStep number="3" title="We’ll plan your visit" copy="Meet the team, experience nursery life and ask all the questions you need." />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, label, value, href, external = false }) {
  return <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} className="group rounded-[28px] border border-[var(--line)] bg-white p-7 text-center transition hover:-translate-y-1 hover:shadow-xl"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--cream)] text-xl text-[var(--coral)] group-hover:bg-[var(--sun)]">{icon}</span><span className="mt-5 block text-[10px] font-black uppercase tracking-[.18em] text-[var(--ink-muted)]">{label}</span><strong className="mt-2 block break-words text-sm text-[var(--palm)]">{value}</strong></a>;
}

function NextStep({ number, title, copy }) {
  return <div className="grid grid-cols-[45px_1fr] gap-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--sun)] text-xs font-black text-[var(--palm)]">0{number}</span><div><h3 className="font-display text-xl text-[var(--palm)]">{title}</h3><p className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">{copy}</p></div></div>;
}
