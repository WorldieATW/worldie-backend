import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateReviewInterface } from './repository.interface'

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    judul,
    konten,
    rating,
    travelerId,
    destinasiWisataId,
  }: CreateReviewInterface) {
    const review = await this.prisma.review.create({
      data: {
        judul: judul,
        konten: konten,
        rating: rating,
        travelerId: travelerId,
        destinasiWisataId: destinasiWisataId,
      },
    })

    return review
  }

  //   async findAllWorldPost() {
  //     const worldPosts = await this.prisma.worldPost.findMany({
  //       where: {
  //         parentPostId: null,
  //       },
  //     })

  //     return worldPosts
  //   }

  async findById(id: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    })

    return review
  }

  async findByIdDestinasiAndUserId(destinasiWisataId: string, userId: string) {
    const review = await this.prisma.review.findMany({
      where: {
        destinasiWisataId: destinasiWisataId,
        travelerId: userId,
      },
    })

    return review
  }

  async deleteById(id: string) {
    await this.prisma.review.delete({
      where: {
        id: id,
      },
    })
  }
}
