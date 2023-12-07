import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateWorldPostInterface } from './repository.interface'

@Injectable()
export class WorldPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    konten,
    attachmentUrl,
    travelerId,
    parentPostId,
  }: CreateWorldPostInterface) {
    const worldPost = await this.prisma.worldPost.create({
      data: {
        konten: konten,
        attachmentUrl: attachmentUrl,
        travelerId: travelerId,
        ...(parentPostId ? { parentPostId: parentPostId } : {}),
      },
    })

    return worldPost
  }

  async findAllWorldPost() {
    const worldPosts = await this.prisma.worldPost.findMany({
      where: {
        parentPostId: null,
      },
      include: {
        traveler: {
          select: {
            nama: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    })

    return worldPosts
  }

  async findById(id: string) {
    const worldPost = await this.prisma.worldPost.findUnique({
      where: {
        id: id,
      },
      include: {
        childrenPost: true,
      },
    })

    return worldPost
  }

  async deleteById(id: string) {
    await this.prisma.worldPost.delete({
      where: {
        id: id,
      },
    })
  }
}
