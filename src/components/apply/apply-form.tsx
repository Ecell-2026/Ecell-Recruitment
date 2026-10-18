"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Info, LoaderCircle, Lock, TriangleAlert, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, SelectWrap, describe, inputClass } from "@/components/apply/field";
import { submitApplication } from "@/components/apply/submit-application";
import { branches } from "@/config/site";
import { domains, getDomain } from "@/config/domains";
import {
  applicationSchema,
  type Application,
  type ApplicationInput,
} from "@/lib/schema";
import { cn } from "@/lib/utils";

const selectClass = cn(inputClass, "appearance-none pr-11");

// Keep digits only; a pasted "+91 98765 43210" keeps just the last 10 digits
const digitsOnly = (raw: string) => raw.replace(/\D/g, "").slice(0, 10);

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type FormProblem = "already_applied" | "invalid" | "server";

export function ApplyForm({ domainSlug }: { domainSlug: string }) {
  const router = useRouter();
  const domain = getDomain(domainSlug)!;
  const [problem, setProblem] = useState<FormProblem | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput, unknown, Application>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    // Text fields start as "" (not undefined) so an empty field shows our message, not Zod's default
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      branchOther: "",
      pref1: domain.slug as ApplicationInput["pref1"],
    },
  });

  const [branch, pref2] = useWatch({ control, name: ["branch", "pref2"] });
  const secondChoices = domains.filter((d) => d.slug !== domain.slug);
  const thirdChoices = secondChoices.filter((d) => d.slug !== pref2);

  async function onSubmit(values: Application) {
    setProblem(null);
    try {
      const result = await submitApplication(values);
      if (result.ok) {
        setDone(true); // keeps the button locked while the next page loads
        router.push("/apply/success");
        return;
      }
      setProblem(result.error);
    } catch {
      setProblem("server");
    }
  }

  const busy = isSubmitting || done;

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field id="name" label="Full name" error={errors.name?.message}>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          className={inputClass}
          {...describe("name", errors.name?.message)}
          {...register("name")}
        />
      </Field>

      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <Field id="phone" label="Mobile number" error={fieldState.error?.message}>
            <input
              id="phone"
              ref={field.ref}
              name={field.name}
              value={field.value ?? ""}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(digitsOnly(e.target.value))}
              onPaste={(e) => {
                e.preventDefault();
                const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
                field.onChange(pasted.slice(-10));
              }}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="10-digit mobile number"
              className={inputClass}
              {...describe("phone", fieldState.error?.message)}
            />
          </Field>
        )}
      />

      <Field
        id="email"
        label="RBU email"
        hint="Starts with 26 and ends with @rbunagpur.in"
        error={errors.email?.message}
      >
        <input
          id="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="26yourname@rbunagpur.in"
          className={inputClass}
          {...describe("email", errors.email?.message)}
          {...register("email")}
        />
      </Field>

      <Field id="branch" label="Branch" error={errors.branch?.message}>
        <SelectWrap>
          <select
            id="branch"
            defaultValue=""
            className={selectClass}
            {...describe("branch", errors.branch?.message)}
            {...register("branch")}
          >
            <option value="" disabled>
              Choose your branch
            </option>
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </SelectWrap>
      </Field>

      {branch === "Other" && (
        <Field id="branchOther" label="Your branch" error={errors.branchOther?.message}>
          <input
            id="branchOther"
            type="text"
            placeholder="Type your branch"
            className={inputClass}
            {...describe("branchOther", errors.branchOther?.message)}
            {...register("branchOther")}
          />
        </Field>
      )}

      <div className="space-y-6 rounded-2xl border border-border bg-card/40 p-4">
        <div>
          <h2 className="font-heading text-lg font-semibold">Your preferences</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Rank the domains in the order you want them.
          </p>
        </div>

        <Field id="pref1" label="1st preference">
          <SelectWrap>
            <select
              id="pref1"
              disabled
              value={domain.slug}
              className={cn(selectClass, "text-(--domain)")}
            >
              <option value={domain.slug}>{domain.name}</option>
            </select>
          </SelectWrap>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock aria-hidden="true" className="size-3.5" />
            Fixed to the domain you picked
          </p>
        </Field>

        <Field id="pref2" label="2nd preference" error={errors.pref2?.message}>
          <SelectWrap>
            <select
              id="pref2"
              defaultValue=""
              className={selectClass}
              {...describe("pref2", errors.pref2?.message)}
              {...register("pref2", {
                onChange: (e) => {
                  // 3rd choice can't repeat the 2nd, so clear it if it now clashes
                  if (getValues("pref3") === e.target.value) {
                    setValue("pref3", "" as ApplicationInput["pref3"]);
                  }
                },
              })}
            >
              <option value="" disabled>
                Choose a domain
              </option>
              {secondChoices.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>

        <Field
          id="pref3"
          label="3rd preference"
          hint={pref2 ? undefined : "Choose your 2nd preference first"}
          error={errors.pref3?.message}
        >
          <SelectWrap>
            <select
              id="pref3"
              defaultValue=""
              disabled={!pref2}
              className={selectClass}
              {...describe("pref3", errors.pref3?.message)}
              {...register("pref3")}
            >
              <option value="" disabled>
                Choose a domain
              </option>
              {thirdChoices.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </SelectWrap>
        </Field>
      </div>

      <Controller
        control={control}
        name="resume"
        render={({ field, fieldState }) => {
          const file = field.value as File | undefined;
          return (
            <Field
              id="resume"
              label="Resume"
              hint="PDF, PNG or JPEG. Up to 2 MB."
              error={fieldState.error?.message}
            >
              <input
                id="resume"
                ref={field.ref}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                className="peer sr-only"
                onBlur={field.onBlur}
                onChange={(e) => {
                  const chosen = e.target.files?.[0];
                  if (chosen) {
                    setValue("resume", chosen, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                  }
                  e.target.value = ""; // lets the same file be picked again
                }}
                {...describe("resume", fieldState.error?.message)}
              />
              <label
                htmlFor="resume"
                className={cn(
                  "flex min-h-14 w-full cursor-pointer items-center gap-3 rounded-xl border border-dashed bg-card px-4 py-3 text-base transition-colors active:bg-secondary peer-focus-visible:ring-3 peer-focus-visible:ring-ring/40",
                  fieldState.error ? "border-destructive" : "border-input",
                )}
              >
                {file ? (
                  <FileText aria-hidden="true" className="size-5 shrink-0" />
                ) : (
                  <Upload aria-hidden="true" className="size-5 shrink-0" />
                )}
                <span className="min-w-0 flex-1">
                  {file ? (
                    <>
                      <span className="block truncate">{file.name}</span>
                      <span className="block text-sm text-muted-foreground">
                        {formatSize(file.size)} · tap to change
                      </span>
                    </>
                  ) : (
                    "Choose a file"
                  )}
                </span>
              </label>
            </Field>
          );
        }}
      />

      {problem === "already_applied" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm"
        >
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p>
            <span className="font-medium">You&apos;ve already applied.</span>{" "}
            We already have an application with this email, so there&apos;s
            nothing more to do.
          </p>
        </div>
      )}
      {(problem === "invalid" || problem === "server") && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p>
            {problem === "invalid"
              ? "Some details look wrong. Please check the form and try again."
              : "Something went wrong. Please check your connection and try again."}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={busy}
        className="h-12 w-full text-base font-semibold"
      >
        {busy ? (
          <>
            <LoaderCircle aria-hidden="true" className="animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit application"
        )}
      </Button>
    </form>
  );
}
