import { Module } from '@nestjs/common';
import { WorldPostManagerService } from './world-post-manager.service';
import { WorldPostManagerController } from './world-post-manager.controller';

@Module({
  controllers: [WorldPostManagerController],
  providers: [WorldPostManagerService]
})
export class WorldPostManagerModule {}
