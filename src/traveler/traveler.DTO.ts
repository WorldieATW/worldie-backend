import { IsString } from 'class-validator'

export class CreateWorldPostDTO {
  @IsString()
  konten: string

  @IsString()
  attachmentUrl: string

  @IsString()
  parentPostId: string
}
