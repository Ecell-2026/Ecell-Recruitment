import { SiteHeader } from "@/components/site-header";

// Common frame for the inner pages: spotlight glow, sticky top bar and a narrow content column.
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-136 bg-[radial-gradient(ellipse_90%_75%_at_50%_0%,oklch(0.34_0.09_265/0.85),transparent)]"
      />
      <SiteHeader />
      <main className="relative mx-auto w-full max-w-2xl flex-1 px-5 pt-28 pb-16 sm:pt-32">
        {children}
      </main>
    </div>
  );
}
