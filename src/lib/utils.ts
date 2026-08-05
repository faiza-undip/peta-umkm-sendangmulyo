export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

/** Tambahkan suffix acak pendek supaya slug tidak pernah bentrok antar UMKM. */
export function uniqueSlug(text: string): string {
  const base = slugify(text) || "umkm";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
