import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { WorldPostManagerService } from './world-post-manager.service'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsTraveler } from 'src/common/decorators/setRolePermission.decorator'

@Controller('world-post-manager')
export class WorldPostManagerController {
  constructor(
    private readonly worldPostManagerService: WorldPostManagerService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsTraveler()
  @Get()
  @HttpCode(HttpStatus.OK)
  async mendapatkanSemuaWorldPost() {
    const responseData = await this.worldPostManagerService.mendapatkanSemuaWorldPost()

    return this.responseUtil.response({}, responseData)
  }

  @IsTraveler()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async melihatDetailWorldPost(@Param('id') id: string) {
    const responseData = await this.worldPostManagerService.melihatDetailWorldPost(id)
    
    return this.responseUtil.response({}, responseData)
  }
}
