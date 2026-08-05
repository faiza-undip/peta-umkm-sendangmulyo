import { notFound } from "next/navigation";
import UmkmForm from "@/components/UmkmForm";
import { getUmkmById, updateUmkm } from "@/app/actions/umkm";

export const dynamic = "force-dynamic";

export default async function EditUmkmPage({ params }: { params: { id: string } }) {
  const umkm = await getUmkmById(params.id);
  if (!umkm) notFound();

  const updateWithId = updateUmkm.bind(null, umkm.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <p className="font-avenir text-xs  tracking-[0.2em] text-teal">Kelola Data</p>
      <h1 className="mt-2 font-avenir text-3xl font-900">Ubah Data · {umkm.businessName}</h1>
      <div className="mt-8">
        <UmkmForm action={updateWithId} initial={umkm} />
      </div>
    </div>
  );
}
