import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { AsetUsahaService } from './aset-usaha.service'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsPublic } from 'src/common/decorators/isPublic.decorator'
import { DestinasiWisataDTO, GetAllAsetUsahaQueryParamDTO, KendaraanDTO, PenginapanDTO } from './aset-usaha.DTO'
import { IsAgen } from 'src/common/decorators/setRolePermission.decorator'
import { GetCurrentUser } from 'src/common/decorators/getCurrentUser.decorator'
import { Pengguna } from '@prisma/client'

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

  @IsAgen()
  @HttpCode(HttpStatus.CREATED)
  @Post('create/tourist-attraction')
  async createDestinasiWisata(@Body() destinasiWisata: DestinasiWisataDTO, @GetCurrentUser() user: Pengguna) {
    const responseData = await this.asetUsahaService.createDestinasiWisata(destinasiWisata, user)

    return this.responseUtil.response({
      responseCode: HttpStatus.CREATED,
      responseMessage: 'Successfully created new Tourist Attraction',
    },
    responseData)
  }

  @IsAgen()
  @HttpCode(HttpStatus.CREATED)
  @Post('create/transportation')
  async createKendaraan(@Body() kendaraan: KendaraanDTO, @GetCurrentUser() user: Pengguna) {
    const responseData = await this.asetUsahaService.createKendaraan(kendaraan, user)

    return this.responseUtil.response({
      responseCode: HttpStatus.CREATED,
      responseMessage: 'Successfully created new Transportation',
    },
    responseData)
  }

  @IsAgen()
  @HttpCode(HttpStatus.CREATED)
  @Post('create/accomodation')
  async createPenginapan(@Body() penginapan: PenginapanDTO, @GetCurrentUser() user: Pengguna) {
    const responseData = await this.asetUsahaService.createPenginapan(penginapan, user)

    return this.responseUtil.response({
      responseCode: HttpStatus.CREATED,
      responseMessage: 'Successfully created new Accomodation',
    },
    responseData)
  }
}
