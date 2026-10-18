import type { Application } from "@/lib/schema";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: "already_applied" | "invalid" | "server" };

// MOCK: waits a second and succeeds, so the form can be built and tested without a backend.
// Replace the body with a real `fetch("/api/submit", { method: "POST", body: formData })`
// once Rishi's endpoint exists. The agreed shape is in docs/submit-contract.md.
export async function submitApplication(
  values: Application,
): Promise<SubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Lets you see the "already applied" message while testing
  if (values.email === "26duplicate@rbunagpur.in") {
    return { ok: false, error: "already_applied" };
  }
  return { ok: true };
}
