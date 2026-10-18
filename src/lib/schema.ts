// Shared validation for the application form.
// Runs in the browser (React Hook Form) and again on the server (POST /api/submit).
// Rules come from .claude/rules/form-and-data.md. Change them only after both agree.

import { z } from "zod";
import { branches } from "@/config/site";
import { domains, type DomainSlug } from "@/config/domains";

export const MAX_RESUME_BYTES = 2 * 1024 * 1024; // 2 MB
export const RESUME_TYPES = ["application/pdf", "image/png", "image/jpeg"];

const domainSlugs = domains.map((d) => d.slug) as [DomainSlug, ...DomainSlug[]];
const domainSlug = (message: string) =>
  z.enum(domainSlugs, { error: message });

export const applicationSchema = z
  .object({
    name: z.string().trim().min(1, "Please enter your name"),

    phone: z
      .string()
      .regex(
        /^[6-9]\d{9}$/,
        "Enter a 10-digit mobile number starting with 6, 7, 8 or 9",
      ),

    // Case-insensitive; stored lowercase
    email: z
      .string()
      .trim()
      .toLowerCase()
      .regex(
        /^26[^\s@]*@rbunagpur\.in$/,
        "Use your RBU email (starts with 26, ends with @rbunagpur.in)",
      ),

    branch: z.enum(branches, { error: "Please choose your branch" }),
    branchOther: z.string().trim().optional(),

    pref1: domainSlug("Invalid first preference"),
    pref2: domainSlug("Please choose your 2nd preference"),
    pref3: domainSlug("Please choose your 3rd preference"),

    resume: z
      .instanceof(File, { error: "Please upload your resume" })
      .refine(
        (file) => RESUME_TYPES.includes(file.type),
        "Resume must be a PDF, PNG or JPEG file",
      )
      .refine(
        (file) => file.size <= MAX_RESUME_BYTES,
        "File is over 2 MB — please upload a PDF or a smaller image",
      ),

    // Domain-specific answers (question id -> answer). Empty until questions arrive.
    domainAnswers: z.record(z.string(), z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.branch === "Other" && !data.branchOther) {
      ctx.addIssue({
        code: "custom",
        path: ["branchOther"],
        message: "Please tell us your branch",
      });
    }
    if (data.pref2 === data.pref1) {
      ctx.addIssue({
        code: "custom",
        path: ["pref2"],
        message: "Choose a different domain from your 1st preference",
      });
    }
    if (data.pref3 === data.pref1 || data.pref3 === data.pref2) {
      ctx.addIssue({
        code: "custom",
        path: ["pref3"],
        message: "Choose a domain you haven't picked yet",
      });
    }
  });

// What the form holds while the student types, and what comes out after validation
export type ApplicationInput = z.input<typeof applicationSchema>;
export type Application = z.output<typeof applicationSchema>;
