import { Controller } from '@nestjs/common'
import { WorldPostManagerService } from './world-post-manager.service'

@Controller('world-post-manager')
export class WorldPostManagerController {
  constructor(
    private readonly worldPostManagerService: WorldPostManagerService
  ) {}
}
