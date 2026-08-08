import Image from "next/image";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import SectionHeading from "@/app/components/SectionHeading";
import { ArrowIcon } from "@/app/components/SiteHeader";

export const metadata = {
  title: "About Us",
  description: "Discover the story, vision, educators and nursery life at New Dubai Nursery Early Learning Center."
};

const values = [
  ["Belonging", "Every child is known, welcomed and encouraged to be fully themselves."],
  ["Curiosity", "Questions are treated as the beginning of meaningful learning."],
  ["Confidence", "Children are trusted with real choices, responsibilities and room to grow."],
  ["Partnership", "Families and educators work together around the needs of each child."],
  ["Culture", "UAE heritage and our diverse community are woven into nursery life."],
  ["Joy", "Play, laughter, creativity and friendship are essential parts of every day."]
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Our story" title={<>A nursery with<br /><em className="font-normal text-[var(--sun)]">heart</em></>} copy="Since 1985, New Dubai Nursery has helped generations of Dubai families give their children a warm and confident start." image="/images/WhatsApp-Image-2025-12-30-at-17.19.38-1024x827.jpg" alt="Children celebrating their families at New Dubai Nursery" imagePosition="center 38%" />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="New Dubai Nursery" title={<>Rooted in Dubai<br />Growing with <em className="font-normal text-[var(--coral)]">families</em></>} />
            <div className="mt-7 space-y-5 text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
              <p>New Dubai Nursery Early Learning Center was founded in September 1985 with a simple belief: early education should nurture the whole child.</p>
              <p>Today, that belief shapes an environment where children can explore, experiment, discover and grow—physically, intellectually, emotionally, socially and creatively.</p>
              <p>We follow KHDA guidance and bring together EYFS best practice with inquiry-led learning, school readiness and meaningful connections to UAE culture and heritage.</p>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-4">
              <Stat value="1985" label="Year founded" />
              <Stat value="2–6" label="Age range" />
            </div>
          </div>
          <div className="relative min-h-[600px]">
            <div className="absolute right-0 top-0 h-[78%] w-[82%] overflow-hidden rounded-[180px_30px_30px_30px]">
              <Image src="/images/WhatsApp-Image-2023-08-15-at-12.12.04-1024x768.jpg" alt="Children exploring nature together" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 h-[42%] w-[52%] overflow-hidden rounded-[30px] border-[8px] border-[var(--paper)] shadow-xl">
              <Image src="/images/sss.jpg" alt="Children enjoying physical play" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
            <div className="absolute bottom-[7%] right-[4%] grid h-32 w-32 place-items-center rounded-full bg-[var(--sun)] text-center text-[var(--palm)] shadow-lg">
              <p className="font-display text-xl leading-tight">Learn<br />through<br />play</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading align="center" eyebrow="What guides us" title={<>Values children can<br /><em className="font-normal text-[var(--coral)]">feel every day</em></>} />
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
            <SectionHeading eyebrow="Nursery life" title={<>Made for movement,<br />mess and <em className="font-normal text-[var(--coral)]">magic</em></>} />
            <p className="max-w-xl text-base leading-8 text-[var(--ink-muted)] lg:justify-self-end">Our spaces invite children to move freely between focused learning, imaginative play, creativity, nature and joyful physical activity.</p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[36px]">
              <Image src="/images/ssss-scaled-1500x1130.jpg" alt="Outdoor role play at New Dubai Nursery" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <LifeCard title="Creative & enquiry spaces" copy="Interactive classrooms, role play, reading, making and a dedicated STEAM environment." color="bg-[var(--mint)]" />
              <LifeCard title="Active indoor & outdoor play" copy="Shaded play, soft play, a junior fitness gym, music, movement and our traffic park." color="bg-[#f7df92]" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--palm)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1250px] items-center gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <div>
            <SectionHeading light eyebrow="Our educators" title={<>Skilled professionals<br /><em className="font-normal text-[var(--sun)]">Caring people</em></>} copy="Our centre manager, special needs educator, teachers, teaching assistants and care assistants work together to make learning safe, personal and memorable." />
            <ul className="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
              {["Early childhood trained educators", "Paediatric first-aid training", "Registered nurse on premises", "On-call doctor", "Ongoing professional learning", "Strong family communication"].map((item) => <li key={item} className="flex gap-3"><span className="text-[var(--sun)]">✓</span>{item}</li>)}
            </ul>
          </div>
          <div className="relative min-h-[480px] overflow-hidden rounded-[38px_120px_38px_38px]">
            <Image src="/images/Untitled-1.jpg" alt="Children learning and playing at New Dubai Nursery" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--sun)] px-5 py-14 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">
          <div><p className="text-xs font-black uppercase tracking-[.18em] text-[var(--palm)]">Could NDN be their place?</p><h2 className="mt-2 font-display text-3xl text-[var(--palm-dark)] sm:text-4xl">Come meet the people behind the care</h2></div>
          <Link href="/contact#visit" className="button bg-[var(--palm)] text-white">Arrange a visit <ArrowIcon /></Link>
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
