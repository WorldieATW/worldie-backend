import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common'
import { CreateReviewDTO } from './review.DTO'
import { RepositoryService } from 'src/repository/repository.service'
import { Pengguna } from '@prisma/client'

@Injectable()
export class ReviewService {
  constructor(private readonly repository: RepositoryService) {}

  async createReview(
    user: Pengguna,
    body: CreateReviewDTO,
    idDestinasiWisata: string
  ) {
    const { judul, konten, rating } = body

    // find destinasi wisata, if not found return error msg
    const destinasiWisata = await this.repository.asetUsaha.findById(
      idDestinasiWisata
    )

    // check if destinasi wisata is available
    if (!destinasiWisata) {
      throw new NotFoundException('Destinasi wisata tidak ditemukan')
    }

    // check if user own the destinasi wisata
    if (destinasiWisata.agenId == user.id) {
      throw new ForbiddenException(
        'Pemilik usaha tidak bisa memberikan ulasan pada aset usaha miliknya'
      )
    }

    // check if user already given review on the destinasi wisata
    const pastReview = await this.repository.review.findByIdDestinasiAndUserId(
      destinasiWisata.id,
      user.id
    )
    // throw error if has reviewed before
    if (pastReview.length > 0) {
      throw new BadRequestException(
        'Already given review for this place, please edit your past review'
      )
    }

    // check available field, return error msg if theres empty field
    if (!judul && !konten && !rating) {
      throw new BadRequestException('Field cannot be empty')
    }
    // check rating range
    if (rating < 0 || rating > 5) {
      throw new BadRequestException('Rating should be on the range from 0 to 5')
    }

    const review = await this.repository.review.create({
      judul,
      konten,
      rating,
      travelerId: user.id,
      destinasiWisataId: idDestinasiWisata,
    })

    return { review: review }
  }

  async editReview(user: Pengguna, body: CreateReviewDTO, idReview: string) {
    const { rating } = body
    // check if the review is belong to the user
    const review = await this.repository.review.findById(idReview)

    // check if review is available
    if (!review) {
      throw new NotFoundException('Review not found')
    }

    if (review.travelerId !== user.id) {
      throw new ForbiddenException('Not allowed to edit others review')
    }

    // check rating field range
    if (rating < 0 || rating > 5) {
      throw new BadRequestException('Rating should be on the range from 0 to 5')
    }

    // update
    const newReview = await this.repository.review.editById(idReview, body)

    return { review: newReview }
  }

  async deleteReview(user: Pengguna, idReview: string) {
    // check if the review is belong to the user
    const review = await this.repository.review.findById(idReview)

    // check if review is available
    if (!review) {
      throw new NotFoundException('Review not found')
    }

    if (review.travelerId !== user.id) {
      throw new ForbiddenException('Not allowed to delete others review')
    }

    // delete
    await this.repository.review.deleteById(idReview)
  }
}
