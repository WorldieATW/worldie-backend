import { Injectable } from '@nestjs/common'
import { PendaftaranAgenRepository } from './pendaftaran-agen.repository'
import { PenggunaRepository } from './pengguna.repository'
import { WorldPostRepository } from './world-post.repository'

@Injectable()
export class RepositoryService {
  constructor(
    readonly pendaftaranAgen: PendaftaranAgenRepository,
    readonly pengguna: PenggunaRepository,
    readonly worldPost: WorldPostRepository
  ) {}
}
