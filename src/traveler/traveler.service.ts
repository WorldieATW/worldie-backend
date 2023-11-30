import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'
import { CreateWorldPostDTO, CreateCommentWorldPostDTO } from './traveler.DTO'
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
        'Content and Attachment Url cannot be empty'
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

  async buatKomentar(
    user: Pengguna,
    postId: string,
    { konten, attachmentUrl }: CreateCommentWorldPostDTO
  ) {
    const parentPost = await this.repository.worldPost.findById(postId)
    if (!parentPost) {
      throw new BadRequestException('Parent Post not found')
    }

    if (!konten && !attachmentUrl) {
      throw new BadRequestException(
        'Content and Attachment Url cannot be empty'
      )
    }

    const { id } = user
    const worldPost = await this.repository.worldPost.create({
      konten: konten,
      attachmentUrl: attachmentUrl,
      travelerId: id,
      parentPostId: postId,
    })

    return { worldPost: worldPost }
  }

  async hapusKomentar(user: Pengguna, idKomentar: string) {
    const comment = await this.repository.worldPost.findById(idKomentar)
    if (!comment) {
      throw new BadRequestException('Comment not found')
    }

    const { parentPostId } = comment
    if (!parentPostId) {
      throw new BadRequestException(
        'Parent Post not found or this is not a comment'
      )
    }

    const { travelerId } = comment
    const { id } = user
    if (travelerId !== id) {
      throw new UnauthorizedException('Unauthorized')
    }

    await this.repository.worldPost.deleteById(idKomentar)
  }
}
