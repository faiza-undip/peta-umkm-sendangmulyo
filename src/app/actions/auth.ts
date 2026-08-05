"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/session";

export type AuthFormState = { error?: string };

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/umkm");

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  const isValid = admin
    ? await bcrypt.compare(password, admin.passwordHash)
    : await bcrypt.compare(password, "$2a$12$invalidsaltinvalidsaltinvalidsalu1e6yQeQfZ6WQm1e6yQeu");

  if (!admin || !isValid) {
    return { error: "Email atau kata sandi salah." };
  }

  await createSession({ sub: admin.id, email: admin.email, name: admin.name });
  redirect(next.startsWith("/") ? next : "/admin/umkm");
}

export async function logout() {
  destroySession();
  redirect("/login");
}