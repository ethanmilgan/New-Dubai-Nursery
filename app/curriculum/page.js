import Image from "next/image";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import SectionHeading from "@/app/components/SectionHeading";
import { ArrowIcon } from "@/app/components/SiteHeader";
import { learningAreas } from "@/app/lib/site-data";

export const metadata = {
  title: "Curriculum",
  description: "Explore New Dubai Nursery's EYFS, inquiry-led curriculum, age pathways and enrichment experiences."
};

const enrichments = [
  ["STEAM & robotics", "Children investigate, build, test and problem-solve with age-appropriate technology and open-ended materials.", "✦", "bg-[var(--mint)]"],
  ["Language & culture", "Arabic, French, Islamic studies and UAE heritage connect language learning with children’s lived community.", "◒", "bg-[#f7d7cd]"],
  ["Music & movement", "Rhythm, dance, aerobics and fitness develop coordination, confidence and expressive joy.", "♪", "bg-[#f7df92]"],
  ["Nature & discovery", "Gardening, sand play, outdoor enquiry and field trips make the wider world part of the classroom.", "⌁", "bg-[#dbeaf1]"]
];

export default function CurriculumPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Curriculum" title={<>Where questions<br />become <em className="font-normal text-[var(--sun)]">possibilities</em></>} copy="Our play-led, inquiry-based programme helps children build strong foundations while protecting the joy and wonder of early childhood." image="/images/WhatsApp-Image-2024-08-02-at-16.10.48_e04cc6ee.jpg" alt="Children exploring an animal habitat with magnifiers" />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="Our approach" title={<>Purposeful play<br /><em className="font-normal text-[var(--coral)]">Real learning</em></>} />
            <div className="mt-7 space-y-5 text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
              <p>Children are naturally curious. We shape environments and experiences that help them explore their ideas, take thoughtful risks and learn with others.</p>
              <p>Educators observe closely, ask questions and extend each child’s thinking. Early literacy, mathematics, science and school-readiness skills are woven into meaningful projects—not isolated from play.</p>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[36px_100px_36px_36px]">
            <Image src="/images/Curriculum1.png" alt="A collage of New Dubai Nursery classroom learning" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading align="center" eyebrow="EYFS foundations" title={<>Seven areas One<br /><em className="font-normal text-[var(--coral)]">whole child</em></>} copy="The Early Years Foundation Stage connects communication, wellbeing, thinking and creativity so children develop in a balanced way." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {learningAreas.map((area, index) => (
              <article key={area} className={`rounded-[28px] p-7 ${index === 6 ? "bg-[var(--palm)] text-white sm:col-span-2 lg:col-span-2" : "border border-[var(--line)] bg-white text-[var(--palm)]"}`}>
                <span className={`text-xs font-black ${index === 6 ? "text-[var(--sun)]" : "text-[var(--coral)]"}`}>0{index + 1}</span>
                <h3 className="mt-8 max-w-xs font-display text-2xl leading-tight">{area}</h3>
              </article>
            ))}
            <article className="flex min-h-[190px] flex-col justify-between rounded-[28px] bg-[var(--sun)] p-7 text-[var(--palm-dark)]"><span className="text-3xl">✦</span><p className="font-display text-2xl leading-tight">Learning is connected, just like life.</p></article>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading eyebrow="Beyond the basics" title={<>More ways to<br /><em className="font-normal text-[var(--coral)]">find their spark</em></>} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {enrichments.map(([title, copy, icon, color]) => (
              <article key={title} className={`${color} rounded-[32px] p-7 sm:p-10`}>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/70 text-2xl text-[var(--coral)]" aria-hidden="true">{icon}</span>
                <h3 className="mt-8 font-display text-3xl text-[var(--palm)]">{title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--ink-muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--palm)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <div className="relative min-h-[570px] overflow-hidden rounded-[40px_40px_150px_40px]">
            <Image src="/images/WhatsApp-Image-2025-12-30-at-19.19.21-1024x657.jpeg" alt="Children learning with a classroom robot" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading light eyebrow="A growing journey" title={<>Ready for school<br /><em className="font-normal text-[var(--sun)]">Ready for life</em></>} copy="School readiness is more than letters and numbers. It is the confidence to ask for help, try again, listen to others, make choices and feel excited by a new challenge." />
            <div className="mt-9 divide-y divide-white/15 border-y border-white/15">
              {["Independence and self-care", "Communication and friendship", "Early literacy and numeracy", "Critical thinking and problem-solving"].map((item) => <div key={item} className="flex items-center gap-4 py-4 text-sm font-bold text-white/80"><span className="text-[var(--sun)]">✓</span>{item}</div>)}
            </div>
            <Link href="/admissions" className="button button-sun mt-9 self-start">Explore admissions <ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
