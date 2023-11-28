import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { PendaftaranAgenService } from './pendaftaran-agen.service'
import { IsAdmin } from 'src/common/decorators/setRolePermission.decorator'
import { ResponseUtil } from 'src/common/utils/response.util'
import { PendaftaranAgenDTO } from './pendaftaran-agen.DTO'

@Controller('pendaftaran-agen')
export class PendaftaranAgenController {
  constructor(
    private readonly pendaftaranAgenService: PendaftaranAgenService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsAdmin()
  @Get()
  async getAllPendaftaranAgen(@Query('name') nameQuery: string) {
    const responseData = {
      agentRegistration:
        await this.pendaftaranAgenService.getAllPendaftaranAgen(),
      nameQuery,
    }

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: 'Successfully get all pendaftaran agen',
      },
      responseData
    )
  }

  @IsAdmin()
  @Post(':pendaftaranId')
  async getAllPendaftaranAgenById(
    @Param('pendaftaranId') pendaftaranId: string,
    @Body() body: PendaftaranAgenDTO
  ) {
    const responseData = {
      id: pendaftaranId,
      ...body,
    }
    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: 'Successfully POST',
      },
      responseData
    )
  }
}
