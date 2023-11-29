import { Body, Controller, HttpCode, HttpStatus, Post, Delete, Param } from '@nestjs/common'
import { TravelerService } from './traveler.service'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsTraveler } from 'src/common/decorators/setRolePermission.decorator'
import { CreateWorldPostDTO } from './traveler.DTO'
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
  async buatWorldPost(@GetCurrentUser() user: Pengguna, @Body() body: CreateWorldPostDTO) {
    const responseData = await this.travelerService.buatWorldPost(user, body)

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: "World Post successfully created"
      }, 
      responseData
    )
  }

  @IsTraveler()
  @Delete('world-post/:idWorldPost')
  @HttpCode(HttpStatus.OK)
  async hapusWorldPost(@GetCurrentUser() user: Pengguna, @Param('idWorldPost') idWorldPost: string) {
    await this.travelerService.hapusWorldPost(user, idWorldPost)
    
    return this.responseUtil.response({responseMessage: 'World Post successfully deleted'})
  }
}
