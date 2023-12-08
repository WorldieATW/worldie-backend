import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { IsPublic } from './common/decorators/isPublic.decorator'
import { ResponseUtil } from './common/utils/response.util'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsPublic()
  @Get()
  getHello(): string {
    const responseData = {
      hello: this.appService.getHello(),
    }

    return this.responseUtil.response(
      {
        responseMessage: 'Successfully hello',
      },
      responseData
    )
  }
}
