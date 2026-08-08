import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./components/SectionHeading";
import TestimonialSlider from "./components/TestimonialSlider";
import { ArrowIcon } from "./components/SiteHeader";
import { contact } from "./lib/site-data";

const programmes = [
  {
    age: "Ages 2–3",
    title: "A gentle first step",
    copy: "Warm relationships, predictable routines and sensory-rich play help our youngest children feel safe, secure and ready to explore.",
    color: "bg-[#f7d7cd]",
    icon: "✦"
  },
  {
    age: "Ages 3–4",
    title: "Curiosity in motion",
    copy: "Imaginative play, conversation, making and movement turn everyday questions into meaningful discoveries.",
    color: "bg-[#f7df92]",
    icon: "⌁"
  },
  {
    age: "Ages 4–6",
    title: "Confidence for school",
    copy: "Purposeful projects weave together early literacy, numeracy, independence and the social skills children need for what comes next.",
    color: "bg-[#cfe5d6]",
    icon: "✿"
  }
];

const features = [
  ["01", "Inquiry-led learning", "Children investigate ideas through play, projects and hands-on exploration."],
  ["02", "EYFS foundations", "Seven connected areas support the whole child and build school readiness."],
  ["03", "Culture & language", "Arabic, French, UAE heritage and a multicultural community broaden every child’s world."],
  ["04", "STEAM & movement", "Robotics, creative making, music, fitness and outdoor learning keep minds and bodies active."]
];

const faqs = [
  ["What ages does New Dubai Nursery welcome?", "Our current nursery information welcomes children from ages 2 to 6. Contact our admissions team to discuss the right placement for your child."],
  ["What curriculum do you follow?", "Our early years programme brings together EYFS best practice, inquiry-based learning, purposeful play and school-readiness pathways."],
  ["Is extended care available?", "Yes. Extended care is available until 6:00 p.m. Please speak with the nursery team for current core hours and transport arrangements."],
  ["How do I arrange a visit?", `Use our short visit form, call us or message us on WhatsApp. You’ll find us at ${contact.addressShort}.`],
  ["Do you provide transport?", "RTA-compliant transport with female supervision is among our services. Availability depends on route, so please confirm your area with the nursery team."]
];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero-grid-pattern relative overflow-hidden bg-[var(--cream)] px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:px-14 lg:pb-28 lg:pt-24">
        <div className="absolute -left-24 bottom-6 h-64 w-64 rounded-full bg-[var(--mint)] blur-2xl" />
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[.87fr_1.13fr]">
          <div className="relative z-10 min-w-0 max-w-2xl">
            <p className="eyebrow text-[var(--coral)]">New Dubai Nursery · Since 1985</p>
            <h1 className="font-display text-[clamp(3.35rem,7.3vw,7.5rem)] leading-[.88] tracking-[-.06em] text-[var(--palm)]">
              A joyful<br />beginning<br /><em className="font-normal text-[var(--coral)]">A confident<br />future</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[var(--ink-muted)] sm:text-lg">For more than 35 years, New Dubai Nursery has helped children learn through play, grow in independence and feel truly at home.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact#visit" className="button button-coral">Book a visit <ArrowIcon /></Link>
              <Link href="/curriculum" className="button button-outline">Explore learning</Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[var(--line)] pt-6 text-xs font-bold text-[var(--palm)]">
              <span className="flex items-center gap-2"><Check /> Ages 2–6</span>
              <span className="flex items-center gap-2"><Check /> EYFS best practice</span>
              <span className="flex items-center gap-2"><Check /> KHDA aligned</span>
            </div>
          </div>

          <div className="relative min-h-[520px] sm:min-h-[640px]">
            <div className="absolute left-[2%] top-[2%] h-[78%] w-[62%] overflow-hidden rounded-[220px_220px_40px_40px] bg-[var(--mint)] shadow-[0_30px_80px_rgba(20,66,57,.15)]">
              <Image src="/images/1st_Slide_Only_Pic.jpg" alt="A child drawing at New Dubai Nursery" fill priority sizes="(max-width: 1024px) 60vw, 35vw" className="object-cover object-top" />
            </div>
            <div className="absolute right-0 top-[9%] h-[38%] w-[43%] overflow-hidden rounded-[30px_90px_30px_30px] border-[7px] border-[var(--cream)] bg-white shadow-xl">
              <Image src="/images/WhatsApp-Image-2025-12-30-at-19.19.21-1024x657.jpeg" alt="Children exploring robotics at New Dubai Nursery" fill sizes="(max-width: 1024px) 42vw, 23vw" className="object-cover" />
            </div>
            <div className="absolute bottom-[2%] right-[5%] h-[38%] w-[48%] overflow-hidden rounded-[90px_30px_30px_30px] border-[7px] border-[var(--cream)] bg-white shadow-xl">
              <Image src="/images/WhatsApp-Image-2024-08-02-at-15.55.02_d018a10b-1024x768.jpg" alt="Children exploring the nursery garden" fill sizes="(max-width: 1024px) 46vw, 25vw" className="object-cover" />
            </div>
            <div className="absolute bottom-[7%] left-0 z-10 rounded-2xl bg-[var(--sun)] px-5 py-4 text-[var(--palm-dark)] shadow-lg">
              <strong className="block font-display text-3xl leading-none">35+</strong>
              <span className="mt-1 block text-[10px] font-black uppercase tracking-[.15em]">Years in early education</span>
            </div>
            <div className="decor-dots absolute -right-9 bottom-2 h-32 w-32 text-[var(--coral)] opacity-30" />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-[var(--line)] bg-white py-4" aria-label="Nursery highlights">
        <div className="marquee-track flex w-max items-center whitespace-nowrap text-xs font-black uppercase tracking-[.18em] text-[var(--palm)]">
          {[...Array(2)].flatMap((_, group) => ["Learn through play", "Ages 2–6", "School readiness", "Arabic & French", "Robotics & STEAM", "Music & movement", "Extended care"].map((item) => <span className="flex items-center" key={`${group}-${item}`}><span className="mx-7 text-[var(--coral)]">✿</span>{item}</span>))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-24">
          <div className="relative">
            <div className="relative aspect-[1/1.02] max-w-[650px] overflow-hidden rounded-[40px_40px_150px_40px]">
              <Image src="/images/LearnMore_homeiiii.png" alt="Children painting together at New Dubai Nursery" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-7 right-3 max-w-[230px] rounded-[28px] bg-[var(--palm)] p-5 text-white shadow-xl sm:right-[-15px]">
              <p className="font-display text-xl leading-snug">“A home away from home.”</p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/55">Our promise to every family</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="A place to belong" title={<>Children learn best when they feel <em className="font-normal text-[var(--coral)]">seen</em></>} />
            <div className="mt-7 space-y-5 text-base leading-8 text-[var(--ink-muted)] sm:text-lg">
              <p>Our educators create a safe, caring environment where each child’s interests, pace and personality are respected.</p>
              <p>Through play, conversation, movement and discovery, children build confidence, make friends and develop a genuine love for learning.</p>
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-5 border-b border-[var(--palm)] pb-1 text-sm font-bold text-[var(--palm)]">Meet New Dubai Nursery <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--palm)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-14 lg:py-32" id="programmes">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading light eyebrow="Growing together" title={<>The right rhythm for<br /><em className="font-normal text-[var(--sun)]">every little learner</em></>} />
            <p className="max-w-md text-base leading-8 text-white/65">Development looks different at every age. Our experiences grow with each child while play remains at the heart of the day.</p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {programmes.map((programme, index) => (
              <article key={programme.age} className={`${programme.color} group flex min-h-[430px] flex-col overflow-hidden rounded-[32px] p-7 text-[var(--palm-dark)] transition hover:-translate-y-2 sm:p-9`}>
                <div className="flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[.18em]">{programme.age}</span><span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--palm)]/15 text-xl">{programme.icon}</span></div>
                <div className="my-9 flex min-h-24 items-center justify-center" aria-hidden="true"><ProgrammeArt index={index} /></div>
                <h3 className="font-display text-3xl leading-tight tracking-[-.03em]">{programme.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--palm-dark)]/70">{programme.copy}</p>
                <Link href="/curriculum" className="mt-auto flex items-center justify-between border-t border-[var(--palm)]/15 pt-5 text-sm font-bold">Discover this stage <ArrowIcon /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading eyebrow="Our learning approach" title={<>Learning happens<br /><em className="font-normal text-[var(--coral)]">everywhere</em></>} copy="Our curriculum gives children room to wonder, test ideas, express themselves and make meaningful connections." />
          <div className="mt-14 grid overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(35,71,63,.08)] lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative min-h-[420px] lg:min-h-[650px]">
              <Image src="/images/WhatsApp-Image-2024-08-02-at-16.10.48_e04cc6ee.jpg" alt="Children using magnifiers during an enquiry-based activity" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[var(--palm)] backdrop-blur">Real classroom discovery</div>
            </div>
            <div className="divide-y divide-[var(--line)] p-7 sm:p-10 lg:p-12">
              {features.map(([number, title, copy]) => (
                <article key={number} className="grid grid-cols-[45px_1fr] gap-3 py-6 first:pt-0 last:pb-0">
                  <span className="text-xs font-black text-[var(--coral)]">{number}</span>
                  <div><h3 className="font-display text-2xl text-[var(--palm)]">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">{copy}</p></div>
                </article>
              ))}
              <Link href="/curriculum" className="button button-outline mt-8">Explore our curriculum <ArrowIcon /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow="Life at NDN" title={<>Space to play<br />Reasons to <em className="font-normal text-[var(--coral)]">wonder</em></>} />
            <Link href="/about#nursery-life" className="button button-outline">Explore nursery life <ArrowIcon /></Link>
          </div>
          <div className="mt-14 grid auto-rows-[250px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PhotoCard className="sm:row-span-2 lg:col-span-2" image="/images/ssss-scaled-1500x1130.jpg" alt="Children enjoying outdoor role play" label="Outdoor role play" />
            <PhotoCard image="/images/sss.jpg" alt="Children riding tricycles" label="Movement & fitness" />
            <PhotoCard image="/images/WhatsApp-Image-2025-12-30-at-17.19.38-1024x827.jpg" alt="Children holding family crafts" label="Families & belonging" />
            <PhotoCard className="sm:col-span-2" image="/images/WhatsApp-Image-2024-08-02-at-16.20.09_d84fc08c-1500x999.jpg" alt="Children taking part in a nursery celebration" label="Celebration & expression" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--mint)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div className="relative mx-auto h-[500px] w-full max-w-[500px] overflow-hidden rounded-[220px_220px_30px_30px]">
            <Image src="/images/35d18dca-bc1e-4c71-85e4-7d4c04cd5438.jpg" alt="Children gardening together" fill sizes="(max-width: 1024px) 90vw, 40vw" className="object-cover" />
          </div>
          <div>
            <SectionHeading eyebrow="Care you can trust" title={<>Safe hands<br /><em className="font-normal text-[var(--coral)]">Happy hearts</em></>} copy="Children thrive when they feel secure. Our care, routines and environments are thoughtfully designed around their wellbeing." />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {["Registered nurse on site", "On-call doctor", "Paediatric first-aid trained staff", "Secure indoor & outdoor play"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/65 p-4 text-sm font-bold text-[var(--palm)]"><Check />{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--coral)] px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
        <div className="decor-dots absolute -right-12 -top-12 h-60 w-60 text-white opacity-10" />
        <TestimonialSlider />
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading align="center" eyebrow="Joining New Dubai Nursery" title={<>From hello to<br /><em className="font-normal text-[var(--coral)]">first day</em></>} copy="Starting nursery is a big moment. We keep the admissions journey warm, simple and personal." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[["01", "Start a conversation", "Call, WhatsApp or send a visit request. Tell us a little about your child and your preferred start."], ["02", "Meet the nursery", "Visit our Al Hudaiba nursery, explore the setting and ask every question."], ["03", "Prepare for their start", "Complete the admission forms and work with your child’s teacher on a gentle settling-in plan."]].map(([number, title, copy]) => (
              <article key={number} className="rounded-[28px] border border-[var(--line)] bg-white p-7 sm:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--sun)] text-xs font-black text-[var(--palm)]">{number}</span>
                <h3 className="mt-7 font-display text-2xl text-[var(--palm)]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-muted)]">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center"><Link href="/admissions" className="button button-coral">View admissions <ArrowIcon /></Link></div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading eyebrow="Good to know" title={<>Questions from<br /><em className="font-normal text-[var(--coral)]">families</em></>} />
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.map(([question, answer], index) => (
              <details key={question} className="group py-1" open={index === 0}>
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 text-sm font-bold text-[var(--palm)] sm:text-base"><span>{question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xl text-[var(--coral)] transition group-open:rotate-45">+</span></summary>
                <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[var(--ink-muted)]">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--palm)] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-14">
        <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full border-[70px] border-white/5" />
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center text-center">
          <p className="eyebrow text-[var(--sun)]">Come say hello</p>
          <h2 className="max-w-4xl font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[.98] tracking-[-.05em]">A visit is the best way to know if it feels right</h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">Meet our team, explore our Al Hudaiba nursery and talk through the next step for your child.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/contact#visit" className="button button-sun">Request a visit <ArrowIcon /></Link><a href={contact.phoneHref} className="button border border-white/30 text-white">Call {contact.phone}</a></div>
        </div>
      </section>
    </main>
  );
}

function Check() {
  return <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--sun)] text-[10px] text-[var(--palm)]" aria-hidden="true">✓</span>;
}

function ProgrammeArt({ index }) {
  const paths = [
    <><circle cx="60" cy="52" r="25" /><path d="M60 16v9M60 79v10M24 52h10M86 52h10M34 26l7 7M79 71l7 7M86 26l-7 7M41 71l-7 7" /><path d="M113 80c20-33 40-32 61 0" /><circle cx="144" cy="42" r="16" /></>,
    <><path d="M26 83h169M50 83V43l34-21 34 21v40M70 83V61h25v22" /><path d="M138 75c0-25 13-41 37-46-1 22-13 38-37 46Zm0 0c-17-17-31-19-42-11 10 14 24 18 42 11v14" /></>,
    <><path d="M24 81c18-38 43-50 74-25 24 19 38-23 72-10 18 7 26 20 29 35" /><path d="M80 27c8-12 22-12 31 0M142 29l8-14 8 14 16 2-12 11 4 16-16-8-14 8 3-16-12-11 15-2Z" /></>
  ];
  return <svg viewBox="0 0 220 105" className="h-28 w-full max-w-[260px] fill-none stroke-[var(--palm)] stroke-[2]" strokeLinecap="round" strokeLinejoin="round">{paths[index]}</svg>;
}

function PhotoCard({ image, alt, label, className = "" }) {
  return <figure className={`group relative overflow-hidden rounded-[26px] ${className}`}><Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-16"><figcaption className="text-sm font-bold text-white">{label}</figcaption></div></figure>;
}
