"use client";

import { useEffect, useRef, useState } from "react";
import { logout } from "@/app/actions/auth";

export default function AccountMenu({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-sm border border-line px-2.5 py-1.5 text-xs text-paper/80 transition hover:border-paper/40"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold font-display text-[10px] font-bold text-ink">
          {initials}
        </span>
        <span className="hidden font-display  tracking-wider sm:inline">
          {name.split(" ")[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-sm border border-line bg-plate p-4 shadow-xl">
          <p className="font-display text-sm font-800 text-paper">{name}</p>
          <p className="mt-0.5 break-all text-xs text-paper/50">{email}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal/15 px-2 py-1 font-display text-[10px]  tracking-wider text-teal">
            Admin
          </span>

          <form action={logout} className="mt-4 border-t border-line pt-4">
            <button
              type="submit"
              className="w-full rounded-sm border border-clay/50 px-3 py-2 text-left font-display text-[11px]  tracking-wider text-clay transition hover:bg-clay/10"
            >
              Keluar →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
