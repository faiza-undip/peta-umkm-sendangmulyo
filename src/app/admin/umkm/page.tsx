import Link from "next/link";
import { getUmkmList, deleteUmkm } from "@/app/actions/umkm";
import { businessTypeLabel, conditionLabel } from "@/lib/labels";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminUmkmPage() {
  const items = await getUmkmList();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-avenir text-xs  tracking-[0.2em] text-teal">Kelola Data</p>
          <h1 className="mt-2 font-avenir text-3xl font-900">Pendataan UMKM</h1>
          <p className="mt-1 text-sm text-paper/60">{items.length} UMKM tercatat</p>
        </div>
        <Link
          href="/admin/umkm/baru"
          className="rounded-sm bg-gold px-5 py-3 font-avenir text-xs  tracking-wider text-ink hover:bg-gold/90"
        >
          + Tambah UMKM
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-line">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-plate font-avenir text-[11px]  tracking-wider text-paper/50">
              <th className="px-4 py-3">Nama Usaha</th>
              <th className="px-4 py-3">Jenis</th>
              <th className="px-4 py-3">RT/RW</th>
              <th className="px-4 py-3">Kondisi</th>
              <th className="px-4 py-3">Koordinat</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => (
              <tr key={u.id} className="border-b border-line last:border-0 hover:bg-plate/60">
                <td className="px-4 py-3">
                  <p className="font-medium text-paper">{u.businessName}</p>
                  <p className="text-xs text-paper/40">{u.ownerName}</p>
                </td>
                <td className="px-4 py-3 text-paper/70">{businessTypeLabel[u.businessType]}</td>
                <td className="px-4 py-3 text-paper/70">
                  {u.rt}/{u.rw}
                </td>
                <td className="px-4 py-3 text-paper/70">{conditionLabel[u.condition]}</td>
                <td className="px-4 py-3">
                  {u.latitude && u.longitude ? (
                    <span className="text-teal">✓ Ada</span>
                  ) : (
                    <span className="text-clay">Belum</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3 font-avenir text-[11px]  tracking-wider">
                    <Link href={`/direktori/${u.slug}`} className="text-paper/50 hover:text-paper">
                      Lihat
                    </Link>
                    <Link href={`/admin/umkm/${u.id}/edit`} className="text-gold hover:text-gold/80">
                      Ubah
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteUmkm(u.id);
                      }}
                    >
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-sm text-paper/40">
                  Belum ada data UMKM. Mulai dengan menambahkan data hasil survei lapangan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
