import { Injectable } from '@nestjs/common'
import { JenisKendaraan, JenisPenginapan, TipeAsetUsaha } from '@prisma/client'
import {
  DestinasiWisataDTO,
  KendaraanDTO,
  PenginapanDTO,
} from 'src/aset-usaha/aset-usaha.DTO'
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
        tipe,
        jenisKendaraan,
        jenisPenginapan,
      },
      include: {
        alamat: true,
        daftarReview: true,
      },
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

  async createDestinasiWisata(
    {
      nama,
      deskripsi,
      harga,
      imgUrl,
      jalan,
      kota,
      provinsi,
      negara,
    }: DestinasiWisataDTO,
    idAgen: string
  ) {
    const destinasiWisata = await this.prisma.asetUsaha.create({
      data: {
        nama,
        deskripsi,
        harga,
        imgUrl,
        alamat: {
          create: {
            jalan,
            kota,
            provinsi,
            negara,
          },
        },
        tipe: 'DESTINASI_WISATA',
        agen: {
          connect: {
            id: idAgen,
          },
        },
      },
    })

    return destinasiWisata
  }

  async createKendaraan(
    { nama, deskripsi, harga, imgUrl, jenisKendaraan }: KendaraanDTO,
    idAgen: string
  ) {
    const kendaraan = await this.prisma.asetUsaha.create({
      data: {
        nama,
        deskripsi,
        harga,
        imgUrl,
        tipe: 'TRANSPORTASI',
        jenisKendaraan,
        agen: {
          connect: {
            id: idAgen,
          },
        },
      },
    })

    return kendaraan
  }

  async createPenginapan(
    {
      nama,
      deskripsi,
      harga,
      imgUrl,
      jenisPenginapan,
      jalan,
      kota,
      provinsi,
      negara,
    }: PenginapanDTO,
    idAgen: string
  ) {
    const penginapan = await this.prisma.asetUsaha.create({
      data: {
        nama,
        deskripsi,
        harga,
        imgUrl: imgUrl,
        alamat: {
          create: {
            jalan,
            kota,
            provinsi,
            negara,
          },
        },
        tipe: 'PENGINAPAN',
        jenisPenginapan,
        agen: {
          connect: {
            id: idAgen,
          },
        },
      },
    })

    return penginapan
  }

  async updateDestinasiWisata(
    {
      nama,
      deskripsi,
      harga,
      imgUrl,
      jalan,
      kota,
      provinsi,
      negara,
    }: DestinasiWisataDTO,
    id: string
  ) {
    const destinasiWisata = await this.prisma.asetUsaha.update({
      where: {
        id,
      },
      data: {
        nama,
        deskripsi,
        harga,
        imgUrl,
        alamat: {
          create: {
            jalan,
            kota,
            provinsi,
            negara,
          },
        }
      },
    })

    return destinasiWisata
  }

  async updateKendaraan(
    { nama, deskripsi, harga, imgUrl, jenisKendaraan }: KendaraanDTO,
    id: string
  ) {
    const kendaraan = await this.prisma.asetUsaha.update({
      where: {
        id,
      },
      data: {
        nama,
        deskripsi,
        harga,
        imgUrl,
        jenisKendaraan,
      },
    })

    return kendaraan
  }

  async updatePenginapan(
    {
      nama,
      deskripsi,
      harga,
      imgUrl,
      jenisPenginapan,
      jalan,
      kota,
      provinsi,
      negara,
    }: PenginapanDTO,
    id: string
  ) {
    const penginapan = await this.prisma.asetUsaha.update({
      where: {
        id,
      },
      data: {
        nama,
        deskripsi,
        harga,
        imgUrl: imgUrl,
        alamat: {
          create: {
            jalan,
            kota,
            provinsi,
            negara,
          },
        },
        jenisPenginapan,
      },
    })

    return penginapan
  }
}
