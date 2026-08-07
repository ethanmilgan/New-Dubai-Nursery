import PageHero from "@/app/components/PageHero";
import SectionTitle from "@/app/components/SectionTitle";

const policyPdf = "/api/media/assets/ndnelc-policies-procedures-fs2-2025-2026.pdf";

export const metadata = {
  title: "Policies",
  description: "NDNELC policies and procedures for September 2025 to June 2026."
};

export default function PoliciesPage() {
  return (
    <main>
      <PageHero
        title="Policies"
        image="/api/media/assets/WhatsApp-Image-2025-12-30-at-17.19.38-1024x827.jpg"
        imageAlt="Children participating in early years activities"
        imageClass="object-cover object-center"
      />

      <section id="page-content" className="px-5 py-16 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionTitle>NDNELC Policies and Procedures</SectionTitle>
              <p className="mt-5 max-w-3xl text-[17px] leading-8 text-slate-600">
                Policies and procedures for September 2025 to June 2026. The document is displayed below for review.
              </p>
            </div>
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#168ac2] px-6 py-3 text-sm font-black uppercase tracking-wider text-white hover:bg-[#1076a6]"
              href={policyPdf}
              target="_blank"
              rel="noreferrer"
            >
              Open PDF
            </a>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <object data={policyPdf} type="application/pdf" className="h-[78vh] min-h-[620px] w-full">
              <div className="p-8 text-center text-slate-600">
                <p>Your browser cannot display this PDF inline.</p>
                <a className="mt-4 inline-block font-black text-[#168ac2]" href={policyPdf}>
                  Open the policy PDF
                </a>
              </div>
            </object>
          </div>
        </div>
      </section>
    </main>
  );
}
