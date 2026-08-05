"use client";

export default function DeleteButton({ label = "Hapus" }: { label?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Hapus data UMKM ini? Tindakan ini tidak bisa dibatalkan.")) {
          e.preventDefault();
        }
      }}
      className="text-clay hover:text-clay/80"
    >
      {label}
    </button>
  );
}
