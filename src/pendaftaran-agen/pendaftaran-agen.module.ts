import { Module } from '@nestjs/common';
import { PendaftaranAgenService } from './pendaftaran-agen.service';
import { PendaftaranAgenController } from './pendaftaran-agen.controller';

@Module({
  controllers: [PendaftaranAgenController],
  providers: [PendaftaranAgenService]
})
export class PendaftaranAgenModule {}
