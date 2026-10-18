import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ApplyForm } from "@/components/apply/apply-form";
import { PageShell } from "@/components/page-shell";
import { domains, getDomain } from "@/config/domains";

// All 5 domain pages are generated ahead of time, so they open instantly.
// This only switches off Next.js's dev-mode warning about reading `params` here.
export const instant = false;

export function generateStaticParams() {
  return domains.map((d) => ({ domain: d.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/apply/[domain]">): Promise<Metadata> {
  const domain = getDomain((await params).domain);
  return { title: domain ? `Apply to ${domain.name} | E-Cell RBU` : "E-Cell RBU" };
}

export default async function ApplyPage({
  params,
}: PageProps<"/apply/[domain]">) {
  const domain = getDomain((await params).domain);
  if (!domain) notFound();

  return (
    <PageShell>
      <div style={{ "--domain": domain.accent } as CSSProperties}>
        <Link
          href="/"
          className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-muted-foreground active:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All domains
        </Link>

        <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Applying to
        </p>
        <h1 className="mt-2 font-heading text-4xl font-bold text-(--domain) sm:text-5xl">
          {domain.name}
        </h1>
        <p className="mt-3 text-muted-foreground">{domain.description}</p>

        <div className="mt-8">
          <ApplyForm domainSlug={domain.slug} />
        </div>
      </div>
    </PageShell>
  );
}
