import { Test, TestingModule } from '@nestjs/testing'
import { WorldPostManagerController } from './world-post-manager.controller'
import { WorldPostManagerService } from './world-post-manager.service'

describe('WorldPostManagerController', () => {
  let controller: WorldPostManagerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldPostManagerController],
      providers: [WorldPostManagerService],
    }).compile()

    controller = module.get<WorldPostManagerController>(
      WorldPostManagerController
    )
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
