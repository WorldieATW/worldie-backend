import { RolePengguna } from '@prisma/client'

export interface CreatePendaftaranAgenInterface {
  email: string
  password: string
  nama: string
}

export interface CreatePenggunaInterface
  extends CreatePendaftaranAgenInterface {
  role: RolePengguna
}

export interface CreateWorldPostInterface {
  konten?: string
  attachmentUrl?: string
  travelerId: string
  parentPostId?: string
}
export interface CreateReviewInterface {
  judul?: string
  konten?: string
  rating?: number
  travelerId: string
  destinasiWisataId: string
}
