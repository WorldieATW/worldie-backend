import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Param,
  Patch,
  Get,
  Query,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsTraveler } from 'src/common/decorators/setRolePermission.decorator'
import { GetCurrentUser } from 'src/common/decorators/getCurrentUser.decorator'
import { CreateReviewDTO, EditReviewDTO } from './review.DTO'
import { Pengguna } from '@prisma/client'

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsTraveler()
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createReview(
    @GetCurrentUser() user: Pengguna,
    @Body() body: CreateReviewDTO
  ) {
    const response = await this.reviewService.createReview(user, body)

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: 'Review successfully created',
      },
      response
    )
  }

  @IsTraveler()
  @Patch('/:idReview')
  @HttpCode(HttpStatus.OK)
  async editReview(
    @GetCurrentUser() user: Pengguna,
    @Body() body: EditReviewDTO,
    @Param('idReview') idReview: string
  ) {
    const response = await this.reviewService.editReview(user, body, idReview)

    return this.responseUtil.response(
      {
        responseMessage: 'Review successfully edited',
      },
      response
    )
  }

  @IsTraveler()
  @Delete('/:idReview')
  @HttpCode(HttpStatus.OK)
  async deleteReview(
    @GetCurrentUser() user: Pengguna,
    @Param('idReview') idReview: string
  ) {
    await this.reviewService.deleteReview(user, idReview)

    return this.responseUtil.response({
      responseMessage: 'Review successfully deleted',
    })
  }

  @IsTraveler()
  @Get('/:idDestinasi')
  @HttpCode(HttpStatus.OK)
  async getDestinasiReviewById(
    @Param('idDestinasi') idReview: string,
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('rating') rating: string
  ) {
    const pageNumber = parseInt(page, 10) || 1
    const pageSize = parseInt(size, 10) || 10
    const ratingFilter = rating ? parseInt(rating, 10) : undefined

    const reviews = await this.reviewService.getReview(
      idReview,
      pageNumber,
      pageSize,
      ratingFilter
    )

    return this.responseUtil.response(
      {
        responseMessage: 'Review successfully fetched',
      },
      reviews
    )
  }
}
