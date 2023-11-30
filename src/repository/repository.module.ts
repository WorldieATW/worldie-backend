import { Global, Module } from '@nestjs/common'
import { PenggunaRepository } from './pengguna.repository'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PendaftaranAgenRepository } from './pendaftaran-agen.repository'
import { RepositoryService } from './repository.service'
import { WorldPostRepository } from './world-post.repository'

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    RepositoryService,
    PenggunaRepository,
    PendaftaranAgenRepository,
    WorldPostRepository,
  ],
  exports: [RepositoryService],
})
export class RepositoryModule {}
