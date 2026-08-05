import { notFound } from "next/navigation";
import Link from "next/link";
import { getUmkmBySlug } from "@/app/actions/umkm";
import { businessTypeLabel, businessTypeColor, conditionLabel } from "@/lib/labels";
import QrCode from "@/components/QrCode";

export const dynamic = "force-dynamic";

export default async function UmkmDetailPage({ params }: { params: { slug: string } }) {
  const umkm = await getUmkmBySlug(params.slug);
  if (!umkm || !umkm.isPublished) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pageUrl = `${siteUrl}/direktori/${umkm.slug}`;
  const hasCoords = umkm.latitude !== null && umkm.longitude !== null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link href="/direktori" className="font-avenir text-xs  tracking-wider text-paper/50 hover:text-gold">
        ← Kembali ke direktori
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-avenir text-[10px]  tracking-wider"
            style={{
              color: businessTypeColor[umkm.businessType],
              backgroundColor: `${businessTypeColor[umkm.businessType]}1a`,
            }}
          >
            {businessTypeLabel[umkm.businessType]}
          </span>
          <h1 className="mt-3 font-avenir text-3xl font-900 sm:text-4xl">{umkm.businessName}</h1>
          <p className="mt-1 text-paper/60">Pemilik: {umkm.ownerName}</p>

          {umkm.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={umkm.photoUrl}
              alt={`Foto usaha ${umkm.businessName}`}
              className="mt-5 aspect-video w-full max-w-xl rounded-sm border border-line object-cover"
            />
          )}

          {umkm.description && <p className="mt-5 max-w-xl leading-relaxed text-paper/80">{umkm.description}</p>}

          <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2">
            <Field label="Alamat" value={`${umkm.address}, RT ${umkm.rt}/RW ${umkm.rw}`} />
            {umkm.phone && <Field label="Telepon / WhatsApp" value={umkm.phone} />}
            {umkm.instagram && <Field label="Instagram" value={`@${umkm.instagram.replace(/^@/, "")}`} />}
            <Field label="Kondisi Usaha" value={conditionLabel[umkm.condition]} />
            <Field label="Status Legalitas" value={umkm.hasLegality ? "Sudah terdaftar" : "Dalam proses pendampingan"} />
          </dl>

          {umkm.googleMapsLink && (
            <a
              href={umkm.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-sm bg-teal px-5 py-3 font-avenir text-xs  tracking-wider text-ink hover:bg-teal/90"
            >
              Buka di Google Maps →
            </a>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-sm border border-line bg-plate p-5 text-center">
            <p className="font-avenir text-[11px]  tracking-wider text-paper/50">Scan untuk kunjungi halaman ini</p>
            <div className="mt-4 flex justify-center">
              <QrCode value={pageUrl} />
            </div>
            <p className="mt-3 break-all font-avenir text-[11px] text-paper/40">{pageUrl}</p>
          </div>

          {hasCoords && (
            <div className="rounded-sm border border-line bg-plate p-5">
              <p className="font-avenir text-[11px]  tracking-wider text-paper/50">Titik Koordinat</p>
              <p className="mt-2 font-avenir text-sm text-paper/80">
                {Number(umkm.latitude).toFixed(6)}, {Number(umkm.longitude).toFixed(6)}
              </p>
              <Link href="/peta" className="mt-3 inline-block text-xs text-gold underline">
                Lihat di peta →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-avenir text-[11px]  tracking-wider text-paper/40">{label}</dt>
      <dd className="mt-1 text-sm text-paper/85">{value}</dd>
    </div>
  );
}
