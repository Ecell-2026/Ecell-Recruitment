import Image from "next/image";
import { DomainCards } from "@/components/domain-cards";
import { site } from "@/config/site";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-16">
      {/* A very soft glow behind the hero, no patterns */}
      <section className="relative -mx-5 px-5 pt-5 pb-10 sm:pt-8 sm:pb-14 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(0.3_0.04_270/0.55),transparent)]">
        <header className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-4 py-3">
          <Image
            src="/ecell-logo.png"
            alt="E-Cell RBU logo"
            width={108}
            height={108}
            priority
            className="size-10 shrink-0"
          />
          <div>
            <p className="font-heading text-lg font-bold leading-tight">
              {site.name}
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
              Entrepreneurship Cell
            </p>
          </div>
        </header>

        <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-[#fbbf24]"
          />
          {site.dates}
        </p>

        <h1 className="mt-6 font-heading text-[clamp(2.25rem,11vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-tight">
          <span className="block">1st Year</span>
          <span className="block bg-linear-to-r from-[#fbbf24] via-[#e879f9] to-[#38bdf8] bg-clip-text text-transparent">
            Recruitment
          </span>
          <span className="block">Form</span>
        </h1>

        <p className="mt-6 max-w-xl text-xl font-medium leading-snug sm:text-2xl">
          Join E-Cell RBU and turn your ideas into ventures.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
          Choose the domain you want to join, fill a short form and upload your
          resume. You can rank three domains in order of preference.
        </p>
      </section>

      <section aria-label="Domains">
        <DomainCards />
      </section>
    </main>
  );
}
