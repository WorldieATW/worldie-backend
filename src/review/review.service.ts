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
    if (!destinasiWisata) {
      throw new NotFoundException('Destinasi wisata tidak ditemukan')
    }

    // check available field, return error msg if theres empty field
    if (!judul && !konten && !rating) {
      throw new BadRequestException('Field cannot be empty')
    }

    // get user
    const { id } = user
    const review = await this.repository.review.create(
        {
        judul,
        konten,
        rating,
        travelerId: id,
        destinasiWisataId: idDestinasiWisata,
        },
    )

    return { review: review }
  }
}
