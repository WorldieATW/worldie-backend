import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreatePendaftaranAgenInterface } from './repository.interface'
import { StatusPendaftaran } from '@prisma/client'

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

  async findAll(email?: string, nama?: string, status?: StatusPendaftaran) {
    return await this.prisma.pendaftaranAgen.findMany({
      where: {
        email: {
          contains: email,
        },
        nama: {
          contains: nama,
        },
        statusPendaftaran: status,
      },
      select: {
        id: true,
        email: true,
        nama: true,
        statusPendaftaran: true,
        timestamp: true,
      },
    })
  }

  async updateStatus(id: string, status: StatusPendaftaran) {
    await this.prisma.pendaftaranAgen.update({
      where: {
        id,
      },
      data: {
        statusPendaftaran: status,
      },
    })
  }

  async findByEmail(email: string) {
    const agentRegistration = await this.prisma.pendaftaranAgen.findUnique({
      where: {
        email: email,
      },
    })

    return agentRegistration
  }

  async findById(id: string) {
    const agentRegistration = await this.prisma.pendaftaranAgen.findUnique({
      where: {
        id,
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
}
