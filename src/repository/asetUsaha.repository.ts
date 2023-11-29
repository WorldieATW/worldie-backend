import { Injectable } from '@nestjs/common'
import { JenisKendaraan, JenisPenginapan, TipeAsetUsaha } from '@prisma/client'
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
}
