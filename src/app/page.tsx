import { DomainCards } from "@/components/domain-cards";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      {/* Spotlight behind the hero: full width, fades out down the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-136 bg-[radial-gradient(ellipse_90%_75%_at_50%_0%,oklch(0.34_0.09_265/0.85),transparent)]"
      />

      <SiteHeader />

      <main className="relative mx-auto w-full max-w-5xl flex-1 px-5 pb-16">
        <section className="pt-28 pb-10 sm:pt-36 sm:pb-14">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-[#a5b4fc]"
            />
            {site.dates}
          </p>

          {/* Size follows the screen width so "Recruitment" (6.5 x the font size wide) always fits */}
          <h1
            className="mt-6 font-heading font-bold leading-[1.1] tracking-tight"
            style={{ fontSize: "min(calc((100vw - 2.5rem) / 6.8), 5.5rem)" }}
          >
            <span className="block">1st Year</span>
            <span className="block text-[#a5b4fc]">Recruitment</span>
            <span className="block">Form</span>
          </h1>

          <p className="mt-6 max-w-xl text-xl font-medium leading-snug sm:text-2xl">
            Join E-Cell RBU and turn your ideas into ventures.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Choose the domain you want to join, fill a short form and upload
            your resume. You can rank three domains in order of preference.
          </p>
        </section>

        <section aria-label="Domains">
          <DomainCards />
        </section>
      </main>
    </div>
  );
}
