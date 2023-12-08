import { Module } from '@nestjs/common'
import { AsetUsahaService } from './aset-usaha.service'
import { AsetUsahaController } from './aset-usaha.controller'

@Module({
  controllers: [AsetUsahaController],
  providers: [AsetUsahaService],
})
export class AsetUsahaModule {}
