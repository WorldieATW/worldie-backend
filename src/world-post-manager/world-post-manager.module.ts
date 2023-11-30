import { Module } from '@nestjs/common'
import { WorldPostManagerService } from './world-post-manager.service'
import { WorldPostManagerController } from './world-post-manager.controller'
import { RepositoryModule } from 'src/repository/repository.module'

@Module({
  imports: [RepositoryModule],
  controllers: [WorldPostManagerController],
  providers: [WorldPostManagerService],
})
export class WorldPostManagerModule {}
