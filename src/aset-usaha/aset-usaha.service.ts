import { Injectable, NotFoundException } from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'
import { GetAllAsetUsahaQueryParamDTO } from './aset-usaha.DTO'

@Injectable()
export class AsetUsahaService {
  constructor(private readonly repository: RepositoryService) {}

  async getAllAsetUsaha({
    email,
    tipe,
    jenisKendaraan,
    jenisPenginapan,
  }: GetAllAsetUsahaQueryParamDTO) {
    const allAsetUsaha = await this.repository.asetUsaha.findAll(
      email,
      tipe,
      jenisKendaraan,
      jenisPenginapan
    )

    return {
      allAsetUsaha,
    }
  }

  async getAsetUsahaById(id: string) {
    const asetUsaha = await this.getAsetUsahaFromRepo(id)

    return {
      asetUsaha,
    }
  }

  async delete(id: string) {
    const asetUsaha = await this.getAsetUsahaFromRepo(id)

    if (asetUsaha) {
      await this.repository.asetUsaha.delete(id)
    }
  }

  private async getAsetUsahaFromRepo(id: string) {
    const asetUsaha = await this.repository.asetUsaha.findById(id)

    if (!asetUsaha) {
      throw new NotFoundException('No aset usaha found with the given id')
    }

    return asetUsaha
  }
}
