import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'
import { CreateWorldPostDTO } from './traveler.DTO'
import { Pengguna } from '@prisma/client'

@Injectable()
export class TravelerService {
  constructor(private readonly repository: RepositoryService) {}

  async buatWorldPost(
    user: Pengguna,
    { konten, attachmentUrl, parentPostId }: CreateWorldPostDTO
  ) {
    if (!konten && !attachmentUrl) {
      throw new BadRequestException(
        'Content and Attachment Url cannot not be empty'
      )
    }

    const { id } = user
    const worldPost = await this.repository.worldPost.create({
      konten: konten,
      attachmentUrl: attachmentUrl,
      travelerId: id,
      parentPostId: parentPostId,
    })

    return { worldPost: worldPost }
  }

  async hapusWorldPost(user: Pengguna, idWorldPost: string) {
    const worldPost = await this.repository.worldPost.findById(idWorldPost)
    if (!worldPost) {
      throw new BadRequestException('World Post not found')
    }

    const { travelerId } = worldPost
    const { id } = user
    if (travelerId !== id) {
      throw new UnauthorizedException('Invalid World Post')
    }

    await this.repository.worldPost.deleteById(idWorldPost)
  }
}
