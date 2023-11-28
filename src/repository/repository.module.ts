import { Global, Module } from '@nestjs/common';
import { PenggunaRepository } from './pengguna.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PendaftaranAgenRepository } from './pendaftaranAgen.repository';

@Global()
@Module({
    imports: [PrismaModule],
    providers: [PenggunaRepository, PendaftaranAgenRepository],
    exports: [PenggunaRepository, PendaftaranAgenRepository]
})
export class RepositoryModule {}
