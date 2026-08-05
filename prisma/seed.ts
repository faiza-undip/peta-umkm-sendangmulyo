import { PrismaClient } from "@prisma/client";
import { uniqueSlug } from "../src/lib/utils";

const prisma = new PrismaClient();

// Data contoh — ganti/tambah dengan hasil pendataan lapangan yang sebenarnya.
// Koordinat mengelilingi Bundaran Tulus Harapan, RW 09 Sendangmulyo (perkiraan awal,
// sesuaikan dengan titik hasil "Bagikan Lokasi" Google Maps saat survei).
const seedData = [
  {
    businessName: "Warung Bu Siti",
    ownerName: "Siti Rahayu",
    phone: "081234567890",
    businessType: "MAKANAN_BERAT" as const,
    description: "Warung nasi rames & lauk harian, langganan warga sekitar bunderan.",
    address: "Jl. Tulus Harapan Raya",
    rt: "09",
    rw: "09",
    latitude: -7.0353,
    longitude: 110.4461,
    condition: "BAIK" as const,
    hasLegality: true,
  },
  {
    businessName: "Es Teh Sultan Klipang",
    ownerName: "Budi Santoso",
    phone: "081298765432",
    businessType: "MINUMAN" as const,
    description: "Minuman es teh kekinian, ramai saat Car Free Day.",
    address: "Sekitar Bunderan Tulus Harapan",
    rt: "05",
    rw: "09",
    latitude: -7.0358,
    longitude: 110.4468,
    condition: "CUKUP" as const,
    hasLegality: false,
  },
  {
    businessName: "Batik Kulit Sendangmulyo",
    ownerName: "Haji Amin",
    phone: null,
    businessType: "KERAJINAN" as const,
    description: "Produk unggulan RW 09, sudah didampingi Dinas Koperasi.",
    address: "RT 09 Sendangmulyo",
    rt: "09",
    rw: "09",
    latitude: -7.036,
    longitude: 110.4459,
    condition: "BAIK" as const,
    hasLegality: true,
  },
  {
    businessName: "Gorengan Mbak Rini",
    ownerName: "Rini Wulandari",
    phone: "085712345678",
    businessType: "JAJANAN_CAMILAN" as const,
    description: "Gorengan & camilan sore, buka setiap hari di pinggir jalan utama.",
    address: "Jl. Klipang Raya",
    rt: "06",
    rw: "09",
    latitude: null,
    longitude: null,
    condition: "PERLU_PERHATIAN" as const,
    hasLegality: false,
  },
];

async function main() {
  for (const item of seedData) {
    await prisma.umkm.create({
      data: {
        ...item,
        slug: uniqueSlug(item.businessName),
      },
    });
  }
  console.log(`Seed selesai: ${seedData.length} UMKM ditambahkan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
