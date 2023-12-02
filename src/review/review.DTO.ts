import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CreateReviewDTO {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  judul: string

  @IsString()
  konten: string

  @IsNumber()
  @IsNotEmpty()
  rating: number
}
