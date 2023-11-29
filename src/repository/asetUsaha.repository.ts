import { Injectable } from '@nestjs/common'
import { JenisKendaraan, JenisPenginapan, TipeAsetUsaha } from '@prisma/client'
import { DestinasiWisataDTO, KendaraanDTO, PenginapanDTO } from 'src/aset-usaha/aset-usaha.DTO'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AsetUsahaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    email: string,
    tipe: TipeAsetUsaha,
    jenisKendaraan: JenisKendaraan,
    jenisPenginapan: JenisPenginapan
  ) {
    const allAsetUsahaAgen = await this.prisma.asetUsaha.findMany({
      where: {
        agen: {
          email: {
            contains: email,
          },
        },
        tipe: tipe,
        jenisKendaraan: jenisKendaraan,
        jenisPenginapan: jenisPenginapan,
      },
      include: {
        daftarReview: true
      }
    })

    return allAsetUsahaAgen
  }

  async findById(id: string) {
    const asetUsaha = await this.prisma.asetUsaha.findUnique({
      where: {
        id: id,
      },
    })

    return asetUsaha
  }

  async delete(id: string) {
    await this.prisma.asetUsaha.delete({
      where: {
        id: id,
      },
    })
  }

  async createDestinasiWisata({
    nama,
    deskripsi,
    harga,
    jalan,
    kota,
    provinsi,
    negara
  }: DestinasiWisataDTO, idAgen: string) {
    const destinasiWisata = await this.prisma.asetUsaha.create({
        data: {
            nama: nama,
            deskripsi: deskripsi,
            harga: harga,
            alamat: {
                create: {
                    jalan: jalan,
                    kota: kota,
                    provinsi: provinsi,
                    negara: negara
                }
            },
            tipe: 'DESTINASI_WISATA',
            agen: {
                connect: {
                    id: idAgen
                }
            }
        }
    })

    return destinasiWisata
  }

  async createKendaraan({
    nama,
    deskripsi,
    harga,
    jenisKendaraan
  }: KendaraanDTO, idAgen: string) {
    const kendaraan = await this.prisma.asetUsaha.create({
        data: {
            nama: nama,
            deskripsi: deskripsi,
            harga: harga,
            tipe: 'TRANSPORTASI',
            jenisKendaraan: jenisKendaraan,
            agen: {
                connect: {
                    id: idAgen
                }
            }
        }
    })

    return kendaraan
  }
  
  async createPenginapan({
    nama,
    deskripsi,
    harga,
    jenisPenginapan,
    jalan,
    kota,
    provinsi,
    negara
  }: PenginapanDTO, idAgen: string) {
    const penginapan = await this.prisma.asetUsaha.create({
        data: {
            nama: nama,
            deskripsi: deskripsi,
            harga: harga,
            alamat: {
                create: {
                    jalan: jalan,
                    kota: kota,
                    provinsi: provinsi,
                    negara: negara
                }
            },
            tipe: 'PENGINAPAN',
            jenisPenginapan: jenisPenginapan,
            agen: {
                connect: {
                    id: idAgen
                }
            }
        }
    })

    return penginapan
  }
}
