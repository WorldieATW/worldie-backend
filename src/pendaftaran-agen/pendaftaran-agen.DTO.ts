import { IsIn, IsOptional, IsString } from 'class-validator'
import { StatusPendaftaran } from '@prisma/client'

export class GetPendaftaranAgenQueryParamDTO {
  @IsString()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  nama: string

  @IsString()
  @IsIn(['DIAJUKAN', 'DITERIMA', 'DITOLAK'])
  @IsOptional()
  status: StatusPendaftaran
}
