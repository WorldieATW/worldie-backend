import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'
import { GetPendaftaranAgenQueryParamDTO } from './pendaftaran-agen.DTO'
import { MailService } from 'src/mail/mail.service'

@Injectable()
export class PendaftaranAgenService {
  constructor(
    private readonly repository: RepositoryService,
    private readonly mail: MailService
  ) {}

  async getAllPendaftaranAgen({
    email,
    nama,
    status,
  }: GetPendaftaranAgenQueryParamDTO) {
    const pendaftaranAgen = await this.repository.pendaftaranAgen.findAll(
      email,
      nama,
      status
    )

    return { pendaftaranAgen }
  }

  async getPendaftaranAgenById(id: string) {
    const pendaftaranAgen = await this.getPendaftaranFromRepo(id)
    const { password: _, ...res } = pendaftaranAgen

    return { pendaftaranAgen: res }
  }

  async acceptPendaftaranAgen(id: string) {
    const pendaftaranAgen = await this.getPendaftaranFromRepo(id)

    const { email, nama, password } = pendaftaranAgen
    const user = await this.repository.pengguna.findByEmail(email)

    if (user) {
      throw new ConflictException('User with the given email already exists')
    }

    if (pendaftaranAgen.statusPendaftaran !== 'DIAJUKAN') {
      throw new ForbiddenException('PendaftaranAgen has already been processed')
    }

    await this.repository.pendaftaranAgen.updateStatus(id, 'DITERIMA')

    await this.repository.pengguna.create({
      email,
      password,
      nama,
      role: 'AGEN',
    })

    this.mail.sendMail(email, nama, 'accept')
  }

  async rejectPendaftaranAgen(id: string) {
    const { email, nama, statusPendaftaran } =
      await this.getPendaftaranFromRepo(id)

    if (statusPendaftaran !== 'DIAJUKAN') {
      throw new ForbiddenException('PendaftaranAgen has already been processed')
    }

    await this.repository.pendaftaranAgen.updateStatus(id, 'DITOLAK')

    this.mail.sendMail(email, nama, 'reject')
  }

  private async getPendaftaranFromRepo(id: string) {
    const pendaftaranAgen = await this.repository.pendaftaranAgen.findById(id)

    if (!pendaftaranAgen) {
      throw new NotFoundException('No PendaftaranAgen found with the given id')
    }

    return pendaftaranAgen
  }
}
