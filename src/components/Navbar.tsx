import Link from "next/link";
import { getSession } from "@/lib/session";
import AccountMenu from "@/components/AccountMenu";

const publicLinks = [
  { href: "/", label: "Ringkasan" },
  { href: "/peta", label: "Peta" },
  { href: "/direktori", label: "Direktori" },
];

export default async function Navbar() {
  const session = await getSession();
  const links = session ? [...publicLinks, { href: "/admin/umkm", label: "Kelola Data" }] : publicLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold/60 font-display text-sm font-800 text-gold">
            09
          </span>
          <span className="font-display text-[15px] font-800 uppercase tracking-wide">
            Peta UMKM <span className="text-gold">Sendangmulyo</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-sm px-3 py-2 text-paper/70 transition hover:bg-plate hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-1 border-l border-line pl-3">
            {session ? (
              <AccountMenu name={session.name} email={session.email} />
            ) : (
              <Link
                href="/login"
                className="rounded-sm border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-paper/70 transition hover:border-paper/40 hover:text-paper"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}