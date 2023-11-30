import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { RepositoryService } from 'src/repository/repository.service'
import {
  DestinasiWisataDTO,
  GetAllAsetUsahaQueryParamDTO,
  KendaraanDTO,
  PenginapanDTO,
} from './aset-usaha.DTO'
import { Pengguna } from '@prisma/client'

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

  async createDestinasiWisata(body: DestinasiWisataDTO, user: Pengguna) {
    if (user.role !== 'AGEN') {
      throw new ForbiddenException('You dont have permission')
    }

    const idAgen = user.id
    const destinasiWisata =
      await this.repository.asetUsaha.createDestinasiWisata(body, idAgen)

    return destinasiWisata
  }

  async createKendaraan(body: KendaraanDTO, user: Pengguna) {
    if (user.role !== 'AGEN') {
      throw new ForbiddenException('You dont have permission')
    }

    const idAgen = user.id
    const kendaraan = await this.repository.asetUsaha.createKendaraan(
      body,
      idAgen
    )

    return kendaraan
  }

  async createPenginapan(body: PenginapanDTO, user: Pengguna) {
    if (user.role !== 'AGEN') {
      throw new ForbiddenException('You dont have permission')
    }

    const idAgen = user.id
    const penginapan = await this.repository.asetUsaha.createPenginapan(
      body,
      idAgen
    )

    return penginapan
  }

  private async getAsetUsahaFromRepo(id: string) {
    const asetUsaha = await this.repository.asetUsaha.findById(id)

    if (!asetUsaha) {
      throw new NotFoundException('No Aset Usaha found with the given id')
    }

    return asetUsaha
  }
}
