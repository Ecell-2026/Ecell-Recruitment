import Image from "next/image";
import { DomainCards } from "@/components/domain-cards";
import { site } from "@/config/site";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:py-16">
      <header className="flex flex-col items-center text-center">
        <Image
          src="/ecell-logo.png"
          alt="E-Cell RBU"
          width={108}
          height={108}
          priority
          className="size-16"
        />
        <h1 className="mt-6 font-heading text-3xl font-bold leading-tight sm:text-5xl">
          {site.title}
        </h1>
        <p className="mt-3 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
          {site.dates}
        </p>
        <p className="mt-6 max-w-md text-balance text-muted-foreground">
          Pick the domain you want to join. You&apos;ll fill a short form and
          upload your resume.
        </p>
      </header>

      <section className="mt-10 sm:mt-14" aria-label="Domains">
        <DomainCards />
      </section>
    </main>
  );
}
