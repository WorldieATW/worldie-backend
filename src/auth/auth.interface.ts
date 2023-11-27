import { Pengguna } from '@prisma/client'
import { Request } from 'express'

export interface AuthenticatedRequestInterface extends Request {
  user: Pengguna
}

export interface FinalizedUser {
  email: string
  nama: string
}
