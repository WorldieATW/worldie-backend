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
