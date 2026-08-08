import Image from "next/image";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import SectionHeading from "@/app/components/SectionHeading";
import { ArrowIcon } from "@/app/components/SiteHeader";
import { contact, forms } from "@/app/lib/site-data";

export const metadata = {
  title: "Admissions",
  description: "New Dubai Nursery admissions, age range, application steps, required documents and downloadable forms."
};

const childDocuments = ["Passport and valid visa copies", "Emirates ID copy", "Birth certificate copy", "Recent passport-size photographs", "Immunisation record copy"];
const parentDocuments = ["Parent passport and visa copies", "Parent Emirates ID copies", "Recent passport-size photographs", "Authorised pick-up person ID and photograph"];

export default function AdmissionsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Admissions" title={<>Their next chapter<br />starts with <em className="font-normal text-[var(--sun)]">hello</em></>} copy="We welcome enrolment enquiries throughout the year for children ages 2 to 6. Our team will help you understand placement, availability and the settling-in journey." image="/images/Admissions11.jpg" alt="A smiling child at New Dubai Nursery" imagePosition="72% center" />

      <section className="border-b border-[var(--line)] bg-white px-5 py-8 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-3">
          <Fact icon="✦" title="Ages 2–6" copy="Early years placements" />
          <Fact icon="↻" title="Year-round" copy="Enrolment enquiries" />
          <Fact icon="◒" title="Extended care" copy="Available until 6:00 p.m." />
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-[var(--ink-muted)]">Core programme timings currently differ across official nursery pages. Please confirm the latest schedule directly with admissions.</p>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <SectionHeading align="center" eyebrow="How to join" title={<>A simple, supportive<br /><em className="font-normal text-[var(--coral)]">admissions journey</em></>} copy="We want families to feel informed and comfortable from the first conversation." />
          <div className="relative mt-16 grid gap-8 md:grid-cols-3">
            <div className="absolute left-[15%] right-[15%] top-8 hidden border-t border-dashed border-[var(--coral)]/40 md:block" aria-hidden="true" />
            <Step number="1" title="Tell us about your child" copy="Message, call or complete our visit form with your child’s age and preferred start." />
            <Step number="2" title="Meet our team" copy={`Visit us at ${contact.addressShort} for a relaxed conversation and nursery tour.`} />
            <Step number="3" title="Complete enrolment" copy="Submit the relevant forms and documents, then prepare a personal settling-in plan." />
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3"><Link href="/contact#visit" className="button button-coral">Request a visit <ArrowIcon /></Link><a href={contact.whatsappHref} className="button button-outline" target="_blank" rel="noreferrer">Ask on WhatsApp</a></div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="Before you apply" title={<>Documents to<br /><em className="font-normal text-[var(--coral)]">prepare</em></>} copy="The nursery team will confirm the current number of copies and any additional requirements before submission." />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[34px_100px_34px_34px]">
              <Image src="/images/WhatsApp-Image-2025-12-30-at-17.19.38-1024x827.jpg" alt="New Dubai Nursery children celebrating family connections" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <DocumentCard title="For your child" items={childDocuments} color="bg-[var(--mint)]" />
            <DocumentCard title="For parents" items={parentDocuments} color="bg-[#f7df92]" />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1050px]">
          <SectionHeading align="center" eyebrow="Download centre" title={<>Admission forms,<br /><em className="font-normal text-[var(--coral)]">ready when you are</em></>} copy="Download the nursery’s official forms. Please check with admissions that you are using the latest version before submitting." />
          <div className="mt-12 overflow-hidden rounded-[28px] border border-[var(--line)] bg-white">
            {forms.map((form, index) => (
              <a key={form.file} href={`/forms/${form.file}`} target="_blank" rel="noreferrer" className="group flex min-h-20 items-center justify-between gap-5 border-b border-[var(--line)] px-5 py-4 last:border-0 hover:bg-[var(--cream)] sm:px-7">
                <span className="flex items-center gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--mint)] text-xs font-black text-[var(--palm)]">0{index + 1}</span><span className="font-bold text-[var(--palm)]">{form.name}</span></span>
                <span className="text-xs font-black uppercase tracking-[.12em] text-[var(--coral)]">PDF ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--palm)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-14">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div><p className="eyebrow text-[var(--sun)]">Need help?</p><h2 className="font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-none tracking-[-.04em]">Every family’s timeline is different</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">Talk with admissions about availability, current timings, transport and how we can support your child’s transition.</p></div>
          <a href={contact.phoneHref} className="button button-sun lg:min-w-48">Call admissions <ArrowIcon /></a>
        </div>
      </section>
    </main>
  );
}

function Fact({ icon, title, copy }) {
  return <div className="flex items-center justify-center gap-4 border-[var(--line)] py-2 sm:border-r sm:last:border-0"><span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--cream)] text-[var(--coral)]">{icon}</span><p><strong className="block font-display text-xl text-[var(--palm)]">{title}</strong><span className="text-xs text-[var(--ink-muted)]">{copy}</span></p></div>;
}

function Step({ number, title, copy }) {
  return <article className="relative text-center"><span className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--coral)] text-sm font-black text-white ring-8 ring-[var(--paper)]">{number}</span><h3 className="mt-7 font-display text-2xl text-[var(--palm)]">{title}</h3><p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[var(--ink-muted)]">{copy}</p></article>;
}

function DocumentCard({ title, items, color }) {
  return <article className={`${color} rounded-[32px] p-7 sm:p-9`}><span className="text-3xl text-[var(--coral)]" aria-hidden="true">✦</span><h3 className="mt-8 font-display text-3xl text-[var(--palm)]">{title}</h3><ul className="mt-6 space-y-4 text-sm text-[var(--ink-muted)]">{items.map((item) => <li key={item} className="flex gap-3"><span className="text-[var(--coral)]">✓</span><span>{item}</span></li>)}</ul></article>;
}
