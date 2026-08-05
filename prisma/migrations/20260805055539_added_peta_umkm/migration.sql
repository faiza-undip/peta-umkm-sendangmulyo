-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('MAKANAN_BERAT', 'MINUMAN', 'JAJANAN_CAMILAN', 'KATERING', 'KERAJINAN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "UmkmCondition" AS ENUM ('BAIK', 'CUKUP', 'PERLU_PERHATIAN');

-- CreateTable
CREATE TABLE "peta_umkm" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "phone" TEXT,
    "instagram" TEXT,
    "businessType" "BusinessType" NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "rt" TEXT NOT NULL,
    "rw" TEXT NOT NULL DEFAULT '09',
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "googleMapsLink" TEXT,
    "photoUrl" TEXT,
    "condition" "UmkmCondition" NOT NULL DEFAULT 'CUKUP',
    "hasLegality" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "peta_umkm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "peta_umkm_slug_key" ON "peta_umkm"("slug");

-- CreateIndex
CREATE INDEX "peta_umkm_businessType_idx" ON "peta_umkm"("businessType");

-- CreateIndex
CREATE INDEX "peta_umkm_rt_rw_idx" ON "peta_umkm"("rt", "rw");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");
