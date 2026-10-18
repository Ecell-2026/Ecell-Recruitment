import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex flex-col items-center py-8 text-center">
        <p className="font-heading text-6xl font-bold text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 font-heading text-3xl font-bold">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 max-w-sm text-muted-foreground">
          The link may be wrong. Go back to the home page and pick a domain to
          apply.
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
