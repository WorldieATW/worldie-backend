import { Global, Module } from '@nestjs/common'
import { PenggunaRepository } from './pengguna.repository'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PendaftaranAgenRepository } from './pendaftaran-agen.repository'
import { RepositoryService } from './repository.service'
import { AsetUsahaRepository } from './asetUsaha.repository'
import { WorldPostRepository } from './world-post.repository'
import { ReviewRepository } from './review.repository'

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    RepositoryService,
    PenggunaRepository,
    PendaftaranAgenRepository,
    AsetUsahaRepository,
    WorldPostRepository,
    ReviewRepository,
  ],
  exports: [RepositoryService],
})
export class RepositoryModule {}
