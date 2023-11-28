import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PendaftaranAgenDTO {
  @IsNumber()
  @IsNotEmpty()
  data1: number

  @IsString()
  @IsNotEmpty()
  data2: string
}
