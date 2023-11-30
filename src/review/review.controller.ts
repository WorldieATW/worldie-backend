import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Param,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsTraveler } from 'src/common/decorators/setRolePermission.decorator'
import { GetCurrentUser } from 'src/common/decorators/getCurrentUser.decorator'
import { CreateReviewDTO } from './review.DTO'
import { Pengguna } from '@prisma/client'

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsTraveler()
  @Post('review/:idDestinasiWisata')
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @GetCurrentUser() user: Pengguna,
    @Body() body: CreateReviewDTO,
    @Param('idDestinasiWisata') idDestinasiWisata: string
  ) {
    await this.reviewService.createReview(user, body, idDestinasiWisata)
  }
}
