"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/utils";
import { requireAdmin } from "@/lib/session";
import type { BusinessType, UmkmCondition } from "@prisma/client";

export type UmkmFormState = {
  error?: string;
};

function parseDecimal(value: FormDataEntryValue | null): number | null {
  if (!value || value.toString().trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function readForm(formData: FormData) {
  return {
    businessName: String(formData.get("businessName") ?? "").trim(),
    ownerName: String(formData.get("ownerName") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || null,
    instagram: String(formData.get("instagram") ?? "").trim() || null,
    businessType: String(formData.get("businessType") ?? "LAINNYA") as BusinessType,
    description: String(formData.get("description") ?? "").trim() || null,
    address: String(formData.get("address") ?? "").trim(),
    rt: String(formData.get("rt") ?? "").trim(),
    rw: String(formData.get("rw") ?? "09").trim(),
    latitude: parseDecimal(formData.get("latitude")),
    longitude: parseDecimal(formData.get("longitude")),
    googleMapsLink: String(formData.get("googleMapsLink") ?? "").trim() || null,
    photoUrl: String(formData.get("photoUrl") ?? "").trim() || null,
    condition: String(formData.get("condition") ?? "CUKUP") as UmkmCondition,
    hasLegality: formData.get("hasLegality") === "on",
    isPublished: formData.get("isPublished") !== "off",
  };
}

/** Membuat data UMKM baru hasil pendataan lapangan. */
export async function createUmkm(_prevState: UmkmFormState, formData: FormData): Promise<UmkmFormState> {
  await requireAdmin();
  const data = readForm(formData);

  if (!data.businessName || !data.ownerName || !data.address || !data.rt) {
    return { error: "Nama usaha, nama pemilik, alamat, dan RT wajib diisi." };
  }

  const slug = uniqueSlug(data.businessName);

  await prisma.umkm.create({
    data: { ...data, slug },
  });

  revalidatePath("/");
  revalidatePath("/peta");
  revalidatePath("/direktori");
  revalidatePath("/admin/umkm");
  redirect("/admin/umkm");
}

/** Memperbarui data UMKM yang sudah ada. */
export async function updateUmkm(
  id: string,
  _prevState: UmkmFormState,
  formData: FormData,
): Promise<UmkmFormState> {
  await requireAdmin();
  const data = readForm(formData);

  if (!data.businessName || !data.ownerName || !data.address || !data.rt) {
    return { error: "Nama usaha, nama pemilik, alamat, dan RT wajib diisi." };
  }

  await prisma.umkm.update({
    where: { id },
    data,
  });

  revalidatePath("/");
  revalidatePath("/peta");
  revalidatePath("/direktori");
  revalidatePath("/admin/umkm");
  redirect("/admin/umkm");
}

/** Menghapus data UMKM. */
export async function deleteUmkm(id: string) {
  await requireAdmin();
  await prisma.umkm.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/peta");
  revalidatePath("/direktori");
  revalidatePath("/admin/umkm");
}

export async function getUmkmList() {
  return prisma.umkm.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPublishedUmkm() {
  return prisma.umkm.findMany({
    where: { isPublished: true },
    orderBy: { businessName: "asc" },
  });
}

export async function getUmkmBySlug(slug: string) {
  return prisma.umkm.findUnique({ where: { slug } });
}

export async function getUmkmById(id: string) {
  return prisma.umkm.findUnique({ where: { id } });
}

/** Analisis sederhana: total, persebaran per jenis usaha, per RT, dan status legalitas. */
export async function getUmkmStats() {
  const all = await prisma.umkm.findMany();

  const total = all.length;
  const withCoordinates = all.filter((u) => u.latitude !== null && u.longitude !== null).length;
  const withLegality = all.filter((u) => u.hasLegality).length;

  const byType = all.reduce<Record<string, number>>((acc, u) => {
    acc[u.businessType] = (acc[u.businessType] ?? 0) + 1;
    return acc;
  }, {});

  const byRt = all.reduce<Record<string, number>>((acc, u) => {
    const key = `RT ${u.rt}`;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const byCondition = all.reduce<Record<string, number>>((acc, u) => {
    acc[u.condition] = (acc[u.condition] ?? 0) + 1;
    return acc;
  }, {});

  return { total, withCoordinates, withLegality, byType, byRt, byCondition };
}