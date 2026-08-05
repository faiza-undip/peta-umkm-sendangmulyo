import { createClient } from "@supabase/supabase-js";

/**
 * Klien Supabase untuk kebutuhan tambahan di luar Prisma, misalnya
 * upload foto UMKM ke Supabase Storage atau Supabase Auth untuk halaman admin.
 * Prisma tetap menjadi jalur utama akses data (lihat src/lib/prisma.ts).
 *
 * NB: jalankan `npm install @supabase/supabase-js` bila fitur ini dipakai —
 * package ini sengaja tidak wajib di package.json inti agar instalasi awal ringan.
 */
export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY belum diatur di .env");
  }
  return createClient(url, key);
}
