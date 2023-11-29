import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common'
import { AsetUsahaService } from './aset-usaha.service'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsPublic } from 'src/common/decorators/isPublic.decorator'
import { GetAllAsetUsahaQueryParamDTO } from './aset-usaha.DTO'
import { IsAgen } from 'src/common/decorators/setRolePermission.decorator'

@Controller('aset-usaha')
export class AsetUsahaController {
  constructor(
    private readonly asetUsahaService: AsetUsahaService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsPublic()
  @Get()
  async getAllAsetUsaha(@Query() queryParamDTO: GetAllAsetUsahaQueryParamDTO) {
    const responseData = await this.asetUsahaService.getAllAsetUsaha(
      queryParamDTO
    )

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.OK,
        responseMessage: 'Successfully get Aset Usaha',
      },
      responseData
    )
  }

  @IsPublic()
  @Get(':id')
  async getAsetUsahaById(@Param('id') id: string) {
    const responseData = await this.asetUsahaService.getAsetUsahaById(id)

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.OK,
        responseMessage: 'Successfully get Aset Usaha',
      },
      responseData
    )
  }

  @IsAgen()
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    await this.asetUsahaService.delete(id)

    return this.responseUtil.response({
      responseCode: HttpStatus.OK,
      responseMessage: 'Successfully deleted Aset Usaha',
    })
  }
}
