import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 hari

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET belum diatur di .env — generate dengan `openssl rand -base64 32` lalu tambahkan ke .env",
    );
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  sub: string;
  email: string;
  name: string;
};

/** Membuat sesi baru (dipanggil setelah login berhasil) dan menyimpannya sebagai cookie httpOnly. */
export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT({ email: payload.email, name: payload.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secretKey());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

/** Membaca & memverifikasi sesi saat ini. Mengembalikan null jika tidak login / token tidak valid. */
export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.sub || !payload.email || !payload.name) return null;
    return { sub: payload.sub as string, email: payload.email as string, name: payload.name as string };
  } catch {
    return null;
  }
}

/** Menghapus cookie sesi (logout). */
export function destroySession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

/** Dipanggil di awal server action yang butuh login admin. Redirect ke /login jika belum login. */
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}