import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  CreateReviewInterface,
  EditReviewInterface,
} from './repository.interface'

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

  async editById(
    reviewId: string,
    { judul, konten, rating }: EditReviewInterface
  ) {
    await this.prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        judul: judul,
        konten: konten,
        rating: rating,
      },
    })
  }

  async deleteById(id: string) {
    await this.prisma.review.delete({
      where: {
        id: id,
      },
    })
  }
}
