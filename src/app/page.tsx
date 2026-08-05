import Link from "next/link";
import { getUmkmStats } from "@/app/actions/umkm";
import { businessTypeLabel, businessTypeColor, conditionLabel } from "@/lib/labels";
import StatBar from "@/components/StatBar";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const stats = await getUmkmStats();
  const typeEntries = Object.entries(stats.byType).sort((a, b) => b[1] - a[1]);
  const maxTypeCount = Math.max(1, ...typeEntries.map(([, v]) => v));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-grid-pattern">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="font-avenir text-xs tracking-[0.2em] text-teal">
            RW 09 · Kelurahan Sendangmulyo · Kecamatan Tembalang
          </p>
          <h1 className="mt-5 max-w-3xl font-avenir text-4xl font-900 sm:text-6xl">
            Satu titik koordinat,
            <br />
            satu langkah menuju <span className="text-gold">kawasan kuliner</span> yang
            <span className="text-teal"> halal, aman, dan sehat.</span>
          </h1>
          <p className="mt-6 max-w-xl text-paper/70">
            Pemetaan digital dan direktori UMKM kuliner di sekitar Bundaran Tulus Harapan,
            dibangun dari data lapangan agar setiap warung, katering, dan pengrajin di RW 09
            mudah ditemukan, dan potensinya mudah dibaca.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/peta"
              className="rounded-sm bg-gold px-5 py-3 font-avenir text-xs font-medium  tracking-wider text-ink transition hover:bg-gold/90"
            >
              Buka Peta Interaktif →
            </Link>
            <Link
              href="/direktori"
              className="rounded-sm border border-line px-5 py-3 font-avenir text-xs font-medium  tracking-wider text-paper transition hover:border-paper/40"
            >
              Lihat Direktori
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-4">
          <Metric label="UMKM Terdata" value={stats.total} />
          <Metric label="Bertitik Koordinat" value={stats.withCoordinates} />
          <Metric label="Sudah Berlegalitas" value={stats.withLegality} />
          <Metric
            label="Cakupan Peta"
            value={stats.total ? `${Math.round((stats.withCoordinates / stats.total) * 100)}%` : "0%"}
          />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className="font-avenir text-lg font-800  tracking-wide text-paper">
              Persebaran Jenis Usaha
            </h2>
            <p className="mt-1 text-sm text-paper/50">
              Analisis sederhana dari data pendataan lapangan tim KKNT.
            </p>
            <div className="mt-6 space-y-4">
              {typeEntries.length === 0 && (
                <p className="rounded-sm border border-dashed border-line px-4 py-8 text-center text-sm text-paper/40">
                  Belum ada data UMKM. Tambahkan data lewat menu{" "}
                  <Link href="/admin/umkm/baru" className="text-gold underline">
                    Kelola Data
                  </Link>
                  .
                </p>
              )}
              {typeEntries.map(([type, count]) => (
                <StatBar
                  key={type}
                  label={businessTypeLabel[type as keyof typeof businessTypeLabel] ?? type}
                  value={count}
                  max={maxTypeCount}
                  color={businessTypeColor[type as keyof typeof businessTypeColor] ?? "#E3A234"}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-avenir text-lg font-800  tracking-wide text-paper">
              Kondisi Usaha
            </h2>
            <p className="mt-1 text-sm text-paper/50">Hasil observasi kondisi fisik & operasional.</p>
            <div className="mt-6 space-y-3">
              {Object.entries(stats.byCondition).map(([cond, count]) => (
                <div
                  key={cond}
                  className="flex items-center justify-between rounded-sm border border-line bg-plate px-4 py-3"
                >
                  <span className="text-sm text-paper/80">
                    {conditionLabel[cond as keyof typeof conditionLabel] ?? cond}
                  </span>
                  <span className="font-avenir text-sm text-gold">{count}</span>
                </div>
              ))}
              {Object.keys(stats.byCondition).length === 0 && (
                <p className="rounded-sm border border-dashed border-line px-4 py-8 text-center text-sm text-paper/40">
                  Belum ada data.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-ink px-5 py-6">
      <p className="font-avenir text-3xl font-900 text-paper">{value}</p>
      <p className="mt-1 font-avenir text-[11px]  tracking-wider text-paper/50">{label}</p>
    </div>
  );
}
