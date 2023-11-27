-- CreateEnum
CREATE TYPE "RolePengguna" AS ENUM ('ADMIN', 'AGEN', 'TRAVELER');

-- CreateEnum
CREATE TYPE "StatusPendaftaran" AS ENUM ('DIAJUKAN', 'DITERIMA', 'DITOLAK');

-- CreateEnum
CREATE TYPE "TipeAsetUsaha" AS ENUM ('DESTINASI_WISATA', 'PENGINAPAN', 'TRANSPORTASI');

-- CreateEnum
CREATE TYPE "JenisKendaraan" AS ENUM ('PESAWAT', 'KERETA', 'BUS', 'MINIBUS', 'MOBIL', 'MOTOR');

-- CreateEnum
CREATE TYPE "JenisPenginapan" AS ENUM ('HOTEL', 'VILLA', 'KOST', 'KONTRAKAN');

-- CreateTable
CREATE TABLE "Pengguna" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "role" "RolePengguna" NOT NULL,
    "statusPendaftaran" "StatusPendaftaran",

    CONSTRAINT "Pengguna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldPost" (
    "id" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "travelerId" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentPostId" TEXT,

    CONSTRAINT "WorldPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "travelerId" TEXT NOT NULL,
    "destinasiWisataId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alamat" (
    "id" TEXT NOT NULL,
    "jalan" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "negara" TEXT NOT NULL,

    CONSTRAINT "Alamat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AsetUsaha" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "agenId" TEXT NOT NULL,
    "tipe" "TipeAsetUsaha" NOT NULL,
    "jenisKendaraan" "JenisKendaraan",
    "jenisPenginapan" "JenisPenginapan",
    "rating" INTEGER,
    "alamatId" TEXT,

    CONSTRAINT "AsetUsaha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendaftaranAgen" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusPendaftaran" "StatusPendaftaran" NOT NULL,

    CONSTRAINT "PendaftaranAgen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pengguna_email_key" ON "Pengguna"("email");

-- CreateIndex
CREATE INDEX "Pengguna_id_idx" ON "Pengguna"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WorldPost_parentPostId_key" ON "WorldPost"("parentPostId");

-- CreateIndex
CREATE INDEX "WorldPost_id_idx" ON "WorldPost"("id");

-- CreateIndex
CREATE INDEX "Review_id_idx" ON "Review"("id");

-- CreateIndex
CREATE INDEX "AsetUsaha_id_idx" ON "AsetUsaha"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PendaftaranAgen_email_key" ON "PendaftaranAgen"("email");

-- AddForeignKey
ALTER TABLE "WorldPost" ADD CONSTRAINT "WorldPost_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldPost" ADD CONSTRAINT "WorldPost_parentPostId_fkey" FOREIGN KEY ("parentPostId") REFERENCES "WorldPost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_destinasiWisataId_fkey" FOREIGN KEY ("destinasiWisataId") REFERENCES "AsetUsaha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsetUsaha" ADD CONSTRAINT "AsetUsaha_agenId_fkey" FOREIGN KEY ("agenId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsetUsaha" ADD CONSTRAINT "AsetUsaha_alamatId_fkey" FOREIGN KEY ("alamatId") REFERENCES "Alamat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
