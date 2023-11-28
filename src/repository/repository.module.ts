import { Global, Module } from '@nestjs/common'
import { PenggunaRepository } from './pengguna.repository'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PendaftaranAgenRepository } from './pendaftaranAgen.repository'
import { RepositoryService } from './repository.service'

@Global()
@Module({
  imports: [PrismaModule],
  providers: [RepositoryService, PenggunaRepository, PendaftaranAgenRepository],
  exports: [RepositoryService],
})
export class RepositoryModule {}
