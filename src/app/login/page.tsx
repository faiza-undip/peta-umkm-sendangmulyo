import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const session = await getSession();
  if (session) redirect("/admin/umkm");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="font-display text-xs text-teal">Area Admin</p>
      <h1 className="mt-2 font-display text-3xl font-900">Masuk</h1>
      <p className="mt-1 text-sm text-paper/60">
        Halaman yang bersangkutan dengan pengelolaan UMKM hanya dapat diakses oleh tim KKNT. Silakan login terlebih dahulu.
      </p>
      <div className="mt-8">
        <LoginForm next={searchParams.next} />
      </div>
    </div>
  );
}