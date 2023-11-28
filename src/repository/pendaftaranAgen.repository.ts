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
}
