import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
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
      throw new NotFoundException('World Post not found')
    }

    const { travelerId } = worldPost
    const { id } = user
    if (travelerId !== id) {
      throw new ForbiddenException('Invalid World Post')
    }

    await this.repository.worldPost.deleteById(idWorldPost)
  }

  async buatKomentar(
    user: Pengguna,
    { konten, attachmentUrl, parentPostId }: CreateWorldPostDTO
  ) {
    const parentPost = await this.repository.worldPost.findById(parentPostId)
    if (!parentPost) {
      throw new NotFoundException('Parent Post not found')
    }

    if (!konten && !attachmentUrl) {
      throw new BadRequestException(
        'Content and Attachment Url cannot be empty'
      )
    }

    const { id } = user
    const commentWorldPost = await this.repository.worldPost.create({
      konten: konten,
      attachmentUrl: attachmentUrl,
      travelerId: id,
      parentPostId: parentPostId,
    })

    return { commentWorldPost: commentWorldPost }
  }

  async hapusKomentar(user: Pengguna, idKomentar: string) {
    const comment = await this.repository.worldPost.findById(idKomentar)
    if (!comment) {
      throw new NotFoundException('Comment not found')
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
      throw new ForbiddenException('Comment is not owned by this traveler')
    }

    await this.repository.worldPost.deleteById(idKomentar)
  }
}
