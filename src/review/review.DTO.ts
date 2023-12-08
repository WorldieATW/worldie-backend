import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateReviewDTO {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsOptional()
  judul: string

  @IsString()
  @IsOptional()
  konten: string

  @IsNumber()
  @IsNotEmpty()
  rating: number
}

export class EditReviewDTO {
  @IsString()
  @IsOptional()
  judul: string

  @IsString()
  @IsOptional()
  konten: string

  @IsNumber()
  @IsNotEmpty()
  rating: number
}
