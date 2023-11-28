import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreatePenggunaInterface } from './repository.interface'

@Injectable()
export class PenggunaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, password, nama, role }: CreatePenggunaInterface) {
    const user = await this.prisma.pengguna.create({
      data: {
        email: email,
        password: password,
        nama: nama,
        role: role,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.pengguna.findUnique({
      where: {
        email: email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await this.prisma.pengguna.findUnique({
      where: {
        id: id,
      },
    })

    return user
  }
}
