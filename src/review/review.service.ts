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
    const { judul, konten, rating, attachmentUrl } = body

    // find destinasi wisata, if not found return error msg

    // check available field, return error msg if theres empty field
    if (!judul && !attachmentUrl && !konten && !rating) {
      throw new BadRequestException('Field cannot be empty')
    }

    // get user
  }
}
