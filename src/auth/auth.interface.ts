import { Pengguna } from '@prisma/client'
import { Request } from 'express'

export interface AuthenticatedRequestInterface extends Request {
  user: Pengguna
}

export interface FinalizedUserInterface {
  email: string
  nama: string
}
