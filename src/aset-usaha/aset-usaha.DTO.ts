import { JenisKendaraan, JenisPenginapan, TipeAsetUsaha } from '@prisma/client'
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator'

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

export class DestinasiWisataDTO {
  @IsNotEmpty()
  @IsString()
  nama: string

  @IsNotEmpty()
  @IsString()
  deskripsi: string

  @IsNotEmpty()
  @IsNumber()
  harga: number

  @IsNotEmpty()
  @IsUrl()
  imgUrl: string

  @IsNotEmpty()
  @IsString()
  jalan: string

  @IsString()
  @IsNotEmpty()
  kota: string

  @IsString()
  @IsNotEmpty()
  provinsi: string

  @IsString()
  @IsNotEmpty()
  negara: string
}

export class KendaraanDTO {
  @IsNotEmpty()
  @IsString()
  nama: string

  @IsNotEmpty()
  @IsString()
  deskripsi: string

  @IsNotEmpty()
  @IsNumber()
  harga: number

  @IsNotEmpty()
  @IsUrl()
  imgUrl: string

  @IsNotEmpty()
  jenisKendaraan: JenisKendaraan
}

export class PenginapanDTO {
  @IsNotEmpty()
  @IsString()
  nama: string

  @IsNotEmpty()
  @IsString()
  deskripsi: string

  @IsNotEmpty()
  @IsNumber()
  harga: number

  @IsNotEmpty()
  @IsUrl()
  imgUrl: string

  @IsNotEmpty()
  jenisPenginapan: JenisPenginapan

  @IsNotEmpty()
  @IsString()
  jalan: string

  @IsString()
  @IsNotEmpty()
  kota: string

  @IsString()
  @IsNotEmpty()
  provinsi: string

  @IsString()
  @IsNotEmpty()
  negara: string
}
