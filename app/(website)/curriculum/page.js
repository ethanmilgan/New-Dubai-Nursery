import {getPageContent} from '@/app/lib/cms';
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

export default async function CurriculumPage() {
 const {t, photo} = await getPageContent('curriculum');
const enrichments = [
  [t('text-1', "STEAM & robotics"), t('text-2', "Children investigate, build, test and problem-solve with age-appropriate technology and open-ended materials."), "✦", "bg-[var(--mint)]"],
  [t('text-3', "Language & culture"), t('text-4', "Arabic, French, Islamic studies and UAE heritage connect language learning with children’s lived community."), "◒", "bg-[#f7d7cd]"],
  [t('text-5', "Music & movement"), t('text-6', "Rhythm, dance, aerobics and fitness develop coordination, confidence and expressive joy."), "♪", "bg-[#f7df92]"],
  [t('text-7', "Nature & discovery"), t('text-8', "Gardening, sand play, outdoor enquiry and field trips make the wider world part of the classroom."), "⌁", "bg-[#dbeaf1]"]
];

  return (
    <main id="main-content">
      <PageHero eyebrow={t('text-9', "Curriculum")} title={<>{t('text-10', "Where questions")}<br />{t('text-11', "become ")}<em className="font-normal text-[var(--sun)]">{t('text-12', "possibilities")}</em></>} copy={t('text-13', "Our play-led, inquiry-based programme helps children build strong foundations while protecting the joy and wonder of early childhood.")} image={photo('photo-1').src} alt={photo('photo-1').alt} imagePosition={photo('photo-1').style.objectPosition} />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow={t('text-14', "Our approach")} title={<>{t('text-15', "Purposeful play")}<br /><em className="font-normal text-[var(--coral)]">{t('text-16', "Real learning")}</em></>} />
            <div className="mt-7 space-y-5 text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
              <p>{t('text-17', "Children are naturally curious. We shape environments and experiences that help them explore their ideas, take thoughtful risks and learn with others.")}</p>
              <p>{t('text-18', "Educators observe closely, ask questions and extend each child’s thinking. Early literacy, mathematics, science and school-readiness skills are woven into meaningful projects—not isolated from play.")}</p>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[36px_100px_36px_36px]">
            <Image src={photo('photo-2').src} alt={photo('photo-2').alt} style={photo('photo-2').style} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading align="center" eyebrow={t('text-19', "EYFS foundations")} title={<>{t('text-20', "Seven areas One")}<br /><em className="font-normal text-[var(--coral)]">{t('text-21', "whole child")}</em></>} copy={t('text-22', "The Early Years Foundation Stage connects communication, wellbeing, thinking and creativity so children develop in a balanced way.")} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {learningAreas.map((area, index) => (
              <article key={area} className={`rounded-[28px] p-7 ${index === 6 ? "bg-[var(--palm)] text-white sm:col-span-2 lg:col-span-2" : "border border-[var(--line)] bg-white text-[var(--palm)]"}`}>
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={photo(`learning-${index}`).src} alt={photo(`learning-${index}`).alt} style={photo(`learning-${index}`).style} fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw" className="object-cover" />
                </div>
                <span className={`text-xs font-black ${index === 6 ? "text-[var(--sun)]" : "text-[var(--coral)]"}`}>0{index + 1}</span>
                <h3 className="mt-8 max-w-xs font-display text-2xl leading-tight">{t(`learning-title-${index}`, area)}</h3>
              </article>
            ))}
            <article className="flex min-h-[190px] flex-col justify-between rounded-[28px] bg-[var(--sun)] p-7 text-[var(--palm-dark)]"><span className="text-3xl">✦</span><p className="font-display text-2xl leading-tight">{t('text-23', "Learning is connected, just like life.")}</p></article>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading eyebrow={t('text-24', "Beyond the basics")} title={<>{t('text-25', "More ways to")}<br /><em className="font-normal text-[var(--coral)]">{t('text-26', "find their spark")}</em></>} />
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
            <Image src={photo('photo-3').src} alt={photo('photo-3').alt} style={photo('photo-3').style} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading light eyebrow={t('text-27', "A growing journey")} title={<>{t('text-28', "Ready for school")}<br /><em className="font-normal text-[var(--sun)]">{t('text-29', "Ready for life")}</em></>} copy={t('text-30', "School readiness is more than letters and numbers. It is the confidence to ask for help, try again, listen to others, make choices and feel excited by a new challenge.")} />
            <div className="mt-9 divide-y divide-white/15 border-y border-white/15">
              {[t('text-31', "Independence and self-care"), t('text-32', "Communication and friendship"), t('text-33', "Early literacy and numeracy"), t('text-34', "Critical thinking and problem-solving")].map((item) => <div key={item} className="flex items-center gap-4 py-4 text-sm font-bold text-white/80"><span className="text-[var(--sun)]">✓</span>{item}</div>)}
            </div>
            <Link href="/admissions" className="button button-sun mt-9 self-start">{t('text-35', "Explore admissions ")}<ArrowIcon /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
