import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreatePendaftaranAgenInterface } from './repository.interface'

@Injectable()
export class PendaftaranAgenRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, password, nama }: CreatePendaftaranAgenInterface) {
    const agentRegistration = await this.prisma.pendaftaranAgen.create({
      data: {
        email: email,
        password: password,
        nama: nama,
        statusPendaftaran: 'DIAJUKAN',
      },
    })

    return agentRegistration
  }

  async findByEmail(email: string) {
    const agentRegistration = await this.prisma.pendaftaranAgen.findUnique({
      where: {
        email: email,
      },
    })

    return agentRegistration
  }

  async deleteByEmail(email: string) {
    await this.prisma.pendaftaranAgen.delete({
      where: {
        email: email,
      },
    })
  }

  async findAll() {
    const agentRegistration = await this.prisma.pendaftaranAgen.findMany({
      select: {
        id: true,
        email: true,
        nama: true,
        timestamp: true,
        statusPendaftaran: true,
      },
    })

    return agentRegistration
  }

  async sdasd() {
    return await this.prisma.asetUsaha.findMany({
      where: {
        AND: [
          {
            agen: {
              email: 'email si agen',
            },
          },
          {
            tipe: 'TRANSPORTASI',
          },
        ],
      },
    })
  }

  async jose() {
    return await this.prisma.worldPost.findMany({
      where: {
        traveler: {
          email: 'bonaventuragal@gmail.com',
        },
        parentPost: null,
      },
      include: {
        childrenPost: {
          select: {
            id: true,
            konten: true,
            travelerId: true,
            timestamp: true,
          },
        },
      },
    })
  }
}
