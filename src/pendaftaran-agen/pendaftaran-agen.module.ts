import { Module } from '@nestjs/common'
import { PendaftaranAgenService } from './pendaftaran-agen.service'
import { PendaftaranAgenController } from './pendaftaran-agen.controller'
import { MailModule } from 'src/mail/mail.module'

@Module({
  imports: [MailModule],
  controllers: [PendaftaranAgenController],
  providers: [PendaftaranAgenService],
})
export class PendaftaranAgenModule {}
