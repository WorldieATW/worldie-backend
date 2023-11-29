import { Global, Module } from '@nestjs/common'
import { PenggunaRepository } from './pengguna.repository'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PendaftaranAgenRepository } from './pendaftaranAgen.repository'
import { RepositoryService } from './repository.service'
import { AsetUsahaRepository } from './asetUsaha.repository'

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    RepositoryService,
    PenggunaRepository,
    PendaftaranAgenRepository,
    AsetUsahaRepository,
  ],
  exports: [RepositoryService],
})
export class RepositoryModule {}
