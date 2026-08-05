import type { BusinessType, UmkmCondition } from "@prisma/client";

export const businessTypeLabel: Record<BusinessType, string> = {
  MAKANAN_BERAT: "Makanan Berat",
  MINUMAN: "Minuman",
  JAJANAN_CAMILAN: "Jajanan / Camilan",
  KATERING: "Katering",
  KERAJINAN: "Kerajinan",
  LAINNYA: "Lainnya",
};

export const businessTypeOptions = Object.entries(businessTypeLabel) as [
  BusinessType,
  string,
][];

/** Warna pin peta & badge per jenis usaha — dipetakan ke token warna signage. */
export const businessTypeColor: Record<BusinessType, string> = {
  MAKANAN_BERAT: "#E3A234", // gold
  MINUMAN: "#2F8F7C", // teal
  JAJANAN_CAMILAN: "#C4562F", // clay
  KATERING: "#8AA6A2",
  KERAJINAN: "#B98BC9",
  LAINNYA: "#6B7B7E",
};

export const conditionLabel: Record<UmkmCondition, string> = {
  BAIK: "Baik",
  CUKUP: "Cukup",
  PERLU_PERHATIAN: "Perlu Perhatian",
};

export const conditionOptions = Object.entries(conditionLabel) as [
  UmkmCondition,
  string,
][];
