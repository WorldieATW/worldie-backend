import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Param,
  Patch,
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
  @Post('/:idDestinasiWisata')
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @GetCurrentUser() user: Pengguna,
    @Body() body: CreateReviewDTO,
    @Param('idDestinasiWisata') idDestinasiWisata: string
  ) {
    const response = await this.reviewService.createReview(
      user,
      body,
      idDestinasiWisata
    )

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: 'Review successfully created',
      },
      response
    )
  }

  @IsTraveler()
  @Patch('/edit/:idReview')
  @HttpCode(HttpStatus.OK)
  async editReview(
    @GetCurrentUser() user: Pengguna,
    @Body() body: CreateReviewDTO,
    @Param('idReview') idReview: string
  ) {
    const response = await this.reviewService.editReview(user, body, idReview)

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.OK,
        responseMessage: 'Review successfully edited',
      },
      response
    )
  }

  @IsTraveler()
  @Delete('/destroy/:idReview')
  @HttpCode(HttpStatus.OK)
  async deleteReview(
    @GetCurrentUser() user: Pengguna,
    @Param('idReview') idReview: string
  ) {
    await this.reviewService.deleteReview(user, idReview)

    return this.responseUtil.response({
      responseCode: HttpStatus.OK,
      responseMessage: 'Review successfully deleted',
    })
  }
}
