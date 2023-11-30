import { IsString, IsNumber } from 'class-validator'

export class CreateReviewDTO {
  @IsString()
  judul: string

  @IsString()
  konten: string

  @IsNumber()
  rating: number

  @IsString()
  attachmentUrl: string
}
