import {getPageContent} from '@/app/lib/cms';
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import SectionHeading from "@/app/components/SectionHeading";
import { ArrowIcon } from "@/app/components/SiteHeader";

export const metadata = {
  title: "About Us",
  description: "Discover the story, vision, educators and nursery life at New Dubai Nursery Early Learning Center."
};

export default async function AboutPage() {
 const {t, photo} = await getPageContent('about');
const values = [
  [t('text-1', "Belonging"), t('text-2', "Every child is known, welcomed and encouraged to be fully themselves.")],
  [t('text-3', "Curiosity"), t('text-4', "Questions are treated as the beginning of meaningful learning.")],
  [t('text-5', "Confidence"), t('text-6', "Children are trusted with real choices, responsibilities and room to grow.")],
  [t('text-7', "Partnership"), t('text-8', "Families and educators work together around the needs of each child.")],
  [t('text-9', "Culture"), t('text-10', "UAE heritage and our diverse community are woven into nursery life.")],
  [t('text-11', "Joy"), t('text-12', "Play, laughter, creativity and friendship are essential parts of every day.")]
];

  return (
    <main id="main-content">
      <PageHero eyebrow={t('text-13', "Our story")} title={<>{t('text-14', "A nursery with")}<br /><em className="font-normal text-[var(--sun)]">{t('text-15', "heart")}</em></>} copy={t('text-16', "Since 1985, New Dubai Nursery has helped generations of Dubai families give their children a warm and confident start.")} image={photo('photo-1').src} alt={photo('photo-1').alt} imagePosition={photo('photo-1').style.objectPosition} />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow={t('text-17', "New Dubai Nursery")} title={<>{t('text-18', "Rooted in Dubai")}<br />{t('text-19', "Growing with ")}<em className="font-normal text-[var(--coral)]">{t('text-20', "families")}</em></>} />
            <div className="mt-7 space-y-5 text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
              <p>{t('text-21', "New Dubai Nursery Early Learning Center was founded in September 1985 with a simple belief: early education should nurture the whole child.")}</p>
              <p>{t('text-22', "Today, that belief shapes an environment where children can explore, experiment, discover and grow—physically, intellectually, emotionally, socially and creatively.")}</p>
              <p>{t('text-23', "We follow KHDA guidance and bring together EYFS best practice with inquiry-led learning, school readiness and meaningful connections to UAE culture and heritage.")}</p>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-4">
              <Stat value="1985" label={t('text-24', "Year founded")} />
              <Stat value="2–6" label={t('text-25', "Age range")} />
            </div>
          </div>
          <div className="relative min-h-[600px]">
            <div className="absolute right-0 top-0 h-[78%] w-[82%] overflow-hidden rounded-[180px_30px_30px_30px]">
              <Image src={photo('photo-2').src} alt={photo('photo-2').alt} style={photo('photo-2').style} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-[42%] w-[52%] overflow-hidden rounded-[30px] border-[8px] border-[var(--paper)] shadow-xl">
              <Image src={photo('photo-3').src} alt={photo('photo-3').alt} style={photo('photo-3').style} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="absolute bottom-[7%] right-[4%] grid h-32 w-32 place-items-center rounded-full bg-[var(--sun)] text-center text-[var(--palm)] shadow-lg">
              <p className="font-display text-xl leading-tight">{t('text-26', "Learn")}<br />{t('text-27', "through")}<br />{t('text-28', "play")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading align="center" eyebrow={t('text-29', "What guides us")} title={<>{t('text-30', "Values children can")}<br /><em className="font-normal text-[var(--coral)]">{t('text-31', "feel every day")}</em></>} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[32px] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {values.map(([title, copy], index) => (
              <article key={title} className="bg-white p-8 sm:p-10">
                <div className="flex items-center justify-between"><span className="text-xs font-black text-[var(--coral)]">0{index + 1}</span><span className="text-2xl text-[var(--sun)]" aria-hidden="true">✦</span></div>
                <h3 className="mt-8 font-display text-2xl text-[var(--palm)]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32" id="nursery-life">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <SectionHeading eyebrow={t('text-32', "Nursery life")} title={<>{t('text-33', "Made for movement,")}<br />{t('text-34', "mess and ")}<em className="font-normal text-[var(--coral)]">{t('text-35', "magic")}</em></>} />
            <p className="max-w-xl text-base leading-8 text-[var(--ink-muted)] lg:justify-self-end">{t('text-36', "Our spaces invite children to move freely between focused learning, imaginative play, creativity, nature and joyful physical activity.")}</p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[36px]">
              <Image src={photo('photo-4').src} alt={photo('photo-4').alt} style={photo('photo-4').style} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <LifeCard title={t('text-37', "Creative & enquiry spaces")} copy={t('text-38', "Interactive classrooms, role play, reading, making and a dedicated STEAM environment.")} color="bg-[var(--mint)]" />
              <LifeCard title={t('text-39', "Active indoor & outdoor play")} copy={t('text-40', "Shaded play, soft play, a junior fitness gym, music, movement and our traffic park.")} color="bg-[#f7df92]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--palm)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1250px] items-center gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <div>
            <SectionHeading light eyebrow={t('text-41', "Our educators")} title={<>{t('text-42', "Skilled professionals")}<br /><em className="font-normal text-[var(--sun)]">{t('text-43', "Caring people")}</em></>} copy={t('text-44', "Our centre manager, special needs educator, teachers, teaching assistants and care assistants work together to make learning safe, personal and memorable.")} />
            <ul className="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
              {[t('text-45', "Early childhood trained educators"), t('text-46', "Paediatric first-aid training"), t('text-47', "Registered nurse on premises"), t('text-48', "On-call doctor"), t('text-49', "Ongoing professional learning"), t('text-50', "Strong family communication")].map((item) => <li key={item} className="flex gap-3"><span className="text-[var(--sun)]">✓</span>{item}</li>)}
            </ul>
          </div>
          <div className="relative min-h-[480px] overflow-hidden rounded-[38px_120px_38px_38px]">
            <Image src={photo('photo-5').src} alt={photo('photo-5').alt} style={photo('photo-5').style} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--sun)] px-5 py-14 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-[var(--palm)]">{t('text-51', "Could NDN be their place?")}</p><h2 className="mt-2 font-display text-3xl text-[var(--palm-dark)] sm:text-4xl">{t('text-52', "Come meet the people behind the care")}</h2></div>
          <Link href="/contact#visit" className="button bg-[var(--palm)] text-white">{t('text-53', "Arrange a visit ")}<ArrowIcon /></Link>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return <div className="rounded-2xl bg-[var(--cream)] p-5"><strong className="font-display text-4xl text-[var(--palm)]">{value}</strong><span className="mt-1 block text-[10px] font-black uppercase tracking-[.15em] text-[var(--ink-muted)]">{label}</span></div>;
}

function LifeCard({ title, copy, color }) {
  return <article className={`${color} flex min-h-[245px] flex-col justify-end rounded-[32px] p-7 sm:p-9`}><span className="mb-auto text-3xl text-[var(--coral)]" aria-hidden="true">✿</span><h3 className="font-display text-2xl text-[var(--palm)]">{title}</h3><p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{copy}</p></article>;
}
