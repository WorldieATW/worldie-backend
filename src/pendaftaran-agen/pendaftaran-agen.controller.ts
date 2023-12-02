import { Controller, Get, Param, Patch, Query } from '@nestjs/common'
import { PendaftaranAgenService } from './pendaftaran-agen.service'
import { IsAdmin } from 'src/common/decorators/setRolePermission.decorator'
import { GetPendaftaranAgenQueryParamDTO } from './pendaftaran-agen.DTO'
import { ResponseUtil } from 'src/common/utils/response.util'

@Controller('pendaftaran-agen')
export class PendaftaranAgenController {
  constructor(
    private readonly pendaftaranAgenService: PendaftaranAgenService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsAdmin()
  @Get()
  async getAllPendaftaranAgen(
    @Query() queries: GetPendaftaranAgenQueryParamDTO
  ) {
    const responseData = {
      pendaftaranAgen: await this.pendaftaranAgenService.getAllPendaftaranAgen(
        queries
      ),
    }

    return this.responseUtil.response(
      {
        responseMessage: 'Successfully get all PendaftaranAgen',
      },
      responseData
    )
  }

  @IsAdmin()
  @Get(':id')
  async getPendaftaranAgenById(@Param('id') id: string) {
    const responseData = {
      pendaftaranAgen: await this.pendaftaranAgenService.getPendaftaranAgenById(
        id
      ),
    }

    return this.responseUtil.response(
      {
        responseMessage: 'Successfully get PendaftaranAgen',
      },
      responseData
    )
  }

  @IsAdmin()
  @Patch('accept/:id')
  async acceptPendaftaranAgen(@Param('id') id: string) {
    await this.pendaftaranAgenService.acceptPendaftaranAgen(id)

    return this.responseUtil.response({
      responseMessage: 'Successfully accept PendaftaranAgen',
    })
  }

  @IsAdmin()
  @Patch('reject/:id')
  async rejectPendaftaranAgen(@Param('id') id: string) {
    await this.pendaftaranAgenService.rejectPendaftaranAgen(id)

    return this.responseUtil.response({
      responseMessage: 'Successfully reject PendaftaranAgen',
    })
  }
}
