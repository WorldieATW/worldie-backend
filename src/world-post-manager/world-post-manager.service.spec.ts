import { Test, TestingModule } from '@nestjs/testing'
import { WorldPostManagerService } from './world-post-manager.service'

describe('WorldPostManagerService', () => {
  let service: WorldPostManagerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorldPostManagerService],
    }).compile()

    service = module.get<WorldPostManagerService>(WorldPostManagerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
