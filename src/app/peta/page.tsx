import nextDynamic from "next/dynamic";
import { getPublishedUmkm } from "@/app/actions/umkm";
import { businessTypeColor, businessTypeLabel } from "@/lib/labels";

export const dynamic = "force-dynamic";

const MapView = nextDynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-paper/40">
      Memuat peta…
    </div>
  ),
});

export default async function PetaPage() {
  const items = await getPublishedUmkm();
  const withCoords = items.filter((u) => u.latitude !== null && u.longitude !== null);
  const withoutCoords = items.length - withCoords.length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="font-avenir text-xs  tracking-[0.2em] text-teal">Peta Digital</p>
        <h1 className="mt-2 font-avenir text-3xl font-900">Persebaran UMKM Kuliner RW 09</h1>
        <p className="mt-2 max-w-2xl text-sm text-paper/60">
          {withCoords.length} dari {items.length} UMKM sudah memiliki titik koordinat.
          {withoutCoords > 0 && ` ${withoutCoords} lainnya menunggu pendataan lokasi.`}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="h-[560px] overflow-hidden rounded-sm border border-line lg:col-span-3">
          <MapView items={items} />
        </div>

        <aside className="space-y-4">
          <div className="rounded-sm border border-line bg-plate p-4">
            <p className="font-avenir text-[11px]  tracking-wider text-paper/50">Legenda Jenis Usaha</p>
            <ul className="mt-3 space-y-2.5">
              {Object.entries(businessTypeLabel).map(([type, label]) => (
                <li key={type} className="flex items-center gap-2.5 text-sm">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: businessTypeColor[type as keyof typeof businessTypeColor] }}
                  />
                  <span className="text-paper/80">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs leading-relaxed text-paper/40">
            Titik koordinat dikumpulkan langsung di lapangan menggunakan Google Maps saat
            survei berlangsung, lalu dicatat melalui menu Kelola Data.
          </p>
        </aside>
      </div>
    </div>
  );
}
