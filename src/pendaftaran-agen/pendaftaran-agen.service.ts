import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'
import { GetPendaftaranAgenQueryParamDTO } from './pendaftaran-agen.DTO'

@Injectable()
export class PendaftaranAgenService {
  constructor(private readonly repository: RepositoryService) {}

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
    const { password, ...res } = pendaftaranAgen

    return { pendaftaranAgen: res }
  }

  async acceptPendaftaranAgen(id: string) {
    const pendaftaranAgen = await this.getPendaftaranFromRepo(id)

    const { email, nama, password } = pendaftaranAgen
    const user = await this.repository.pengguna.findByEmail(email)

    if (!!user) {
      throw new ForbiddenException('User with the given email already exists')
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
  }

  async rejectPendaftaranAgen(id: string) {
    const pendaftaranAgen = await this.getPendaftaranFromRepo(id)

    if (pendaftaranAgen.statusPendaftaran !== 'DIAJUKAN') {
      throw new ForbiddenException('PendaftaranAgen has already been processed')
    }

    await this.repository.pendaftaranAgen.updateStatus(id, 'DITOLAK')
  }

  private async getPendaftaranFromRepo(id: string) {
    const pendaftaranAgen = await this.repository.pendaftaranAgen.findById(id)

    if (!pendaftaranAgen) {
      throw new NotFoundException('No PendaftaranAgen found with the given id')
    }

    return pendaftaranAgen
  }
}
