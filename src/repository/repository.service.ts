import { Injectable } from '@nestjs/common'
import { PendaftaranAgenRepository } from './pendaftaranAgen.repository'
import { PenggunaRepository } from './pengguna.repository'

@Injectable()
export class RepositoryService {
  constructor(
    readonly pendaftaranAgen: PendaftaranAgenRepository,
    readonly pengguna: PenggunaRepository
  ) {}
}
