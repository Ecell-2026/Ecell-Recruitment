"use client";

import { useState } from "react";
import Image from "next/image";
import { MotionConfig, motion, useMotionValueEvent, useScroll } from "motion/react";
import { site } from "@/config/site";

// The bar shows while scrolling down and slides away while scrolling up.
// To get the more common behaviour (hide on scroll down, show on scroll up),
// flip the two `setHidden` values below.
export function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (y < 80) {
      setHidden(false); // always visible at the top of the page
    } else if (y > previous + 4) {
      setHidden(false); // scrolling down
    } else if (y < previous - 4) {
      setHidden(true); // scrolling up
    }
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 px-5 pt-3"
      >
        <header className="mx-auto flex max-w-5xl items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur-md">
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
      </motion.div>
    </MotionConfig>
  );
}
