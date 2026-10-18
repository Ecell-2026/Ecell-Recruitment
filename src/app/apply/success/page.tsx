import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Form filled successfully | E-Cell RBU",
};

export default function SuccessPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center py-8 text-center">
        <CircleCheck aria-hidden="true" className="size-16 text-[#4ade80]" />
        <h1 className="mt-6 font-heading text-3xl font-bold sm:text-4xl">
          Form filled successfully
        </h1>
        <p className="mt-3 max-w-sm text-muted-foreground">
          Thank you for applying to E-Cell RBU. We&apos;ve received your
          application.
        </p>
        <Link
          href="/"
          className={cn(
            buttonVariants(),
            "mt-8 h-12 w-full px-6 text-base font-semibold sm:w-auto",
          )}
        >
          Back to home
        </Link>
      </div>
    </PageShell>
  );
}
