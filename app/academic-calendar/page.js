import Image from "next/image";
import SectionTitle from "@/app/components/SectionTitle";

export const metadata={title:"Academic Calendar",description:"EYEG academic calendar and important dates."};
export default function ImportantDatesPage(){return <main><div className="grid min-h-12 place-items-center bg-[#ed1c24] px-4 py-2 text-center text-sm font-black text-white sm:text-xl">Admissions Starting from Ages 2–6 Now!</div><section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-14"><div className="mx-auto max-w-4xl"><SectionTitle center eyebrow="EYEG Academic Calendar">Academic Calendar</SectionTitle><Image src="/assets/Screenshot-2025-12-23-122121-768x1089.png" alt="EYEG academic calendar" width={768} height={1089} priority className="mt-12 w-full shadow-2xl"/></div></section></main>}
