import Link from "next/link";

const links = [
  { href: "/", label: "Ringkasan" },
  { href: "/peta", label: "Peta" },
  { href: "/direktori", label: "Direktori" },
  { href: "/admin/umkm", label: "Kelola Data" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold/60 font-avenir text-sm font-800 text-gold">
            09
          </span>
          <span className="font-avenir text-[15px] font-800  tracking-wide">
            Peta UMKM <span className="text-gold">Sendangmulyo</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 font-avenir text-xs  tracking-wider">
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
      </div>
    </header>
  );
}
