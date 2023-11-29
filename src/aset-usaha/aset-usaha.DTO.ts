import { JenisKendaraan, JenisPenginapan, TipeAsetUsaha } from '@prisma/client'
import { IsEmail, IsIn, IsOptional } from 'class-validator'

export class GetAllAsetUsahaQueryParamDTO {
  @IsEmail()
  @IsOptional()
  email: string

  @IsOptional()
  @IsIn(['DESTINASI_WISATA', 'PENGINAPAN', 'TRANSPORTASI'])
  tipe: TipeAsetUsaha

  @IsOptional()
  @IsIn(['PESAWAT', 'KERETA', 'BUS', 'MINIBUS', 'MOBIL', 'MOTOR'])
  jenisKendaraan: JenisKendaraan

  @IsOptional()
  @IsIn(['HOTEL', 'VILLA', 'KOST', 'KONTRAKAN'])
  jenisPenginapan: JenisPenginapan
}
