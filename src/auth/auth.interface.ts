import { Pengguna, RolePengguna } from '@prisma/client'
import { Request } from 'express'

export interface AuthenticatedRequestInterface extends Request {
  user: Pengguna
}

export interface FinalizedUserInterface {
  id: string
  nama: string
  role: RolePengguna
}
