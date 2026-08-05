"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";
import type { AuthFormState } from "@/app/actions/auth";

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState<AuthFormState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next ?? "/admin/umkm"} />

      {state?.error && (
        <p className="rounded-sm border border-clay/50 bg-clay/10 px-4 py-3 text-sm text-clay">
          {state.error}
        </p>
      )}

      <div>
        <label className="mb-1.5 block font-display text-[11px]  tracking-wider text-paper/50">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-sm border border-line bg-plate px-3.5 py-2.5 text-sm text-paper outline-none focus:border-gold"
          placeholder="admin@sendangmulyo.id"
        />
      </div>

      <div>
        <label className="mb-1.5 block font-display text-[11px]  tracking-wider text-paper/50">
          Kata Sandi
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-sm border border-line bg-plate px-3.5 py-2.5 text-sm text-paper outline-none focus:border-gold"
          placeholder="••••••••"
        />
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-sm bg-gold px-5 py-3 font-display text-xs  tracking-wider text-ink transition hover:bg-gold/90 disabled:opacity-50"
    >
      {pending ? "Memeriksa…" : "Masuk"}
    </button>
  );
}