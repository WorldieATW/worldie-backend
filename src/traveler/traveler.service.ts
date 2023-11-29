import { Injectable, BadRequestException } from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'
import { CreateWorldPostDTO } from './traveler.DTO'
import { Pengguna } from '@prisma/client'

@Injectable()
export class TravelerService {
    constructor(private readonly repository: RepositoryService) {}

    async buatWorldPost(user: Pengguna, { konten, attachmentUrl,  parentPostId }: CreateWorldPostDTO) {
        const { id } = user
        const worldPost = await this.repository.worldPost.create({
            konten: konten,
            attachmentUrl: attachmentUrl,
            travelerId: id,
            parentPostId: parentPostId
        })

        return {worldPost: worldPost}
    }

    async hapusWorldPost(user: Pengguna, idWorldPost: string) {
        const worldPost = await this.repository.worldPost.findById(idWorldPost)
        if (!worldPost) {
            throw new BadRequestException('World Post not found')
        }

        await this.repository.worldPost.deleteById(idWorldPost)
    }
}
