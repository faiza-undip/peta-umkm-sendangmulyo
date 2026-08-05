import UmkmForm from "@/components/UmkmForm";
import { createUmkm } from "@/app/actions/umkm";

export default function NewUmkmPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="font-avenir text-xs  tracking-[0.2em] text-teal">Kelola Data</p>
      <h1 className="mt-2 font-avenir text-3xl font-900">Tambah UMKM Baru</h1>
      <p className="mt-1 text-sm text-paper/60">
        Isi berdasarkan hasil observasi dan wawancara langsung di lapangan.
      </p>
      <div className="mt-8">
        <UmkmForm action={createUmkm} />
      </div>
    </div>
  );
}
