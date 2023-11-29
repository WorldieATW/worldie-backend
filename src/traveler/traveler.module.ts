import { Module } from '@nestjs/common'
import { TravelerService } from './traveler.service'
import { TravelerController } from './traveler.controller'
import { RepositoryModule } from 'src/repository/repository.module'

@Module({
  imports: [RepositoryModule],
  controllers: [TravelerController],
  providers: [TravelerService],
})
export class TravelerModule {}
