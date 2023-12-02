import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Param,
} from '@nestjs/common'
import { TravelerService } from './traveler.service'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsTraveler } from 'src/common/decorators/setRolePermission.decorator'
import { CreateWorldPostDTO, CreateCommentWorldPostDTO } from './traveler.DTO'
import { GetCurrentUser } from 'src/common/decorators/getCurrentUser.decorator'
import { Pengguna } from '@prisma/client'

@Controller('traveler')
export class TravelerController {
  constructor(
    private readonly travelerService: TravelerService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsTraveler()
  @Post('world-post')
  @HttpCode(HttpStatus.CREATED)
  async buatWorldPost(
    @GetCurrentUser() user: Pengguna,
    @Body() body: CreateWorldPostDTO
  ) {
    const responseData = await this.travelerService.buatWorldPost(user, body)

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: 'World Post successfully created',
      },
      responseData
    )
  }

  @IsTraveler()
  @Delete('world-post/:idWorldPost')
  @HttpCode(HttpStatus.OK)
  async hapusWorldPost(
    @GetCurrentUser() user: Pengguna,
    @Param('idWorldPost') idWorldPost: string
  ) {
    await this.travelerService.hapusWorldPost(user, idWorldPost)

    return this.responseUtil.response({
      responseMessage: 'World Post successfully deleted',
    })
  }

  @IsTraveler()
  @Post('world-post/comment/:parentPostId')
  @HttpCode(HttpStatus.CREATED)
  async buatKomentar(
    @GetCurrentUser() user: Pengguna,
    @Param('parentPostId') parentPostId: string,
    @Body() body: CreateCommentWorldPostDTO
  ) {
    const responseData = await this.travelerService.buatKomentar(
      user,
      parentPostId,
      body
    )

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: 'Comment successfully created',
      },
      responseData
    )
  }

  @IsTraveler()
  @Delete('world-post/comment/:idKomentar')
  @HttpCode(HttpStatus.OK)
  async hapusKomentar(
    @GetCurrentUser() user: Pengguna,
    @Param('idKomentar') idKomentar: string
  ) {
    await this.travelerService.hapusKomentar(user, idKomentar)

    return this.responseUtil.response({
      responseMessage: 'Comment successfully deleted',
    })
  }
}
