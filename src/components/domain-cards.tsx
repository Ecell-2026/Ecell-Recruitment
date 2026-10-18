"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { domains } from "@/config/domains";

export function DomainCards() {
  return (
    // reducedMotion="user" turns animations off for people who asked their phone for less motion
    <MotionConfig reducedMotion="user">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <motion.li
            key={domain.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            whileTap={{ scale: 0.97 }}
            style={{ "--accent": domain.accent } as CSSProperties}
          >
            <Link
              href={`/apply/${domain.slug}`}
              className="group flex h-full min-h-28 items-center gap-4 rounded-2xl border border-l-4 border-border border-l-(--accent) bg-card p-5 transition-colors active:bg-secondary lg:hover:border-(--accent) lg:hover:bg-secondary"
            >
              <div className="flex-1">
                <h2 className="font-heading text-xl font-semibold text-(--accent)">
                  {domain.name}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {domain.description}
                </p>
              </div>
              <ArrowRight
                aria-hidden="true"
                className="size-5 shrink-0 text-(--accent) transition-transform lg:group-hover:translate-x-1"
              />
            </Link>
          </motion.li>
        ))}
      </ul>
    </MotionConfig>
  );
}
