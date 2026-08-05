import Link from "next/link";
import { getPublishedUmkm } from "@/app/actions/umkm";
import { businessTypeLabel, businessTypeColor } from "@/lib/labels";

export const dynamic = "force-dynamic";

export default async function DirektoriPage({
  searchParams,
}: {
  searchParams: { jenis?: string };
}) {
  const items = await getPublishedUmkm();
  const activeType = searchParams.jenis;
  const filtered = activeType ? items.filter((u) => u.businessType === activeType) : items;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <p className="font-avenir text-xs  tracking-[0.2em] text-teal">Direktori Digital</p>
      <h1 className="mt-2 font-avenir text-3xl font-900">UMKM Kuliner RW 09 Sendangmulyo</h1>
      <p className="mt-2 max-w-2xl text-sm text-paper/60">
        Setiap UMKM punya halaman & QR Code sendiri agar mudah dibagikan dan diakses pengunjung.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <FilterChip href="/direktori" active={!activeType} label="Semua" />
        {Object.entries(businessTypeLabel).map(([type, label]) => (
          <FilterChip key={type} href={`/direktori?jenis=${type}`} active={activeType === type} label={label} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 rounded-sm border border-dashed border-line px-6 py-16 text-center text-sm text-paper/40">
          Belum ada UMKM pada kategori ini.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u) => (
            <Link
              key={u.id}
              href={`/direktori/${u.slug}`}
              className="group rounded-sm border border-line bg-plate p-5 transition hover:border-gold/50"
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-avenir text-[10px]  tracking-wider"
                style={{
                  color: businessTypeColor[u.businessType],
                  backgroundColor: `${businessTypeColor[u.businessType]}1a`,
                }}
              >
                {businessTypeLabel[u.businessType]}
              </span>
              <h2 className="mt-3 font-avenir text-lg font-800 text-paper group-hover:text-gold">
                {u.businessName}
              </h2>
              <p className="mt-1 text-sm text-paper/60">{u.ownerName}</p>
              <p className="mt-3 text-xs text-paper/40">
                RT {u.rt}/RW {u.rw} · {u.address}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3.5 py-1.5 font-avenir text-[11px]  tracking-wider transition ${
        active
          ? "border-gold bg-gold text-ink"
          : "border-line text-paper/60 hover:border-paper/40 hover:text-paper"
      }`}
    >
      {label}
    </Link>
  );
}
