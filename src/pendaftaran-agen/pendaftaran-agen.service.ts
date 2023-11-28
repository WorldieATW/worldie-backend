import { Injectable } from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'

@Injectable()
export class PendaftaranAgenService {
  constructor(private readonly repository: RepositoryService) {}

  async getHello() {
    return 'hello service'
  }

  async getAllPendaftaranAgen() {
    return await this.repository.pendaftaranAgen.sdasd()
  }
}
