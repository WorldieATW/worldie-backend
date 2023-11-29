import { Injectable, BadRequestException } from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'

@Injectable()
export class WorldPostManagerService {
  constructor(private readonly repository: RepositoryService) {}

  async mendapatkanSemuaWorldPost() {
    const worldPosts = await this.repository.worldPost.findAllWorldPost()
    return { worldPosts: worldPosts }
  }

  async melihatDetailWorldPost(id: string) {
    const worldPost = await this.repository.worldPost.findById(id)
    if (!worldPost) {
      throw new BadRequestException('World Post not found')
    }

    return { worldPost: worldPost }
  }
}
