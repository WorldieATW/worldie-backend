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
    const idAgen = user.id
    const destinasiWisata =
      await this.repository.asetUsaha.createDestinasiWisata(body, idAgen)

    return destinasiWisata
  }

  async createKendaraan(body: KendaraanDTO, user: Pengguna) {
    const idAgen = user.id
    const kendaraan = await this.repository.asetUsaha.createKendaraan(
      body,
      idAgen
    )

    return kendaraan
  }

  async createPenginapan(body: PenginapanDTO, user: Pengguna) {
    const idAgen = user.id
    const penginapan = await this.repository.asetUsaha.createPenginapan(
      body,
      idAgen
    )

    return penginapan
  }

  async updateDestinasiWisata(
    body: DestinasiWisataDTO,
    user: Pengguna,
    id: string
  ) {
    const idAgen = user.id
    const destinasiWisataFromRepo = await this.getAsetUsahaFromRepo(id)

    if (idAgen !== destinasiWisataFromRepo.agenId) {
      throw new ForbiddenException('You dont have permission')
    }

    const destinasiWisata =
      await this.repository.asetUsaha.updateDestinasiWisata(body, id)

    return destinasiWisata
  }

  async updateKendaraan(body: KendaraanDTO, user: Pengguna, id: string) {
    const idAgen = user.id
    const kendaraanFromRepo = await this.getAsetUsahaFromRepo(id)

    if (idAgen !== kendaraanFromRepo.agenId) {
      throw new ForbiddenException('You dont have permission')
    }

    const kendaraan = await this.repository.asetUsaha.updateKendaraan(body, id)

    return kendaraan
  }

  async updatePenginapan(body: PenginapanDTO, user: Pengguna, id: string) {
    const idAgen = user.id
    const penginapanFromRepo = await this.getAsetUsahaFromRepo(id)

    if (idAgen !== penginapanFromRepo.agenId) {
      throw new ForbiddenException('You dont have permission')
    }

    const penginapan = await this.repository.asetUsaha.updatePenginapan(
      body,
      id
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
