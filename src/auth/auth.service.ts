import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoginDTO, RegistrationDTO } from './auth.DTO'
import { hash, compare } from 'bcrypt'
import { USER_ROLE } from './auth.constant'
import { Pengguna, RolePengguna } from '@prisma/client'
import { FinalizedUserInterface } from './auth.interface'
import { PenggunaRepository } from 'src/repository/pengguna.repository'
import { PendaftaranAgenRepository } from 'src/repository/pendaftaranAgen.repository'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly penggunaRepository: PenggunaRepository,
    private readonly pendaftaranAgenRepository: PendaftaranAgenRepository
  ) {}

  async registration({
    email,
    nama,
    role,
    password,
    confirmationPassword,
  }: RegistrationDTO) {
    if (password !== confirmationPassword) {
      throw new BadRequestException(
        'Password does not match confirmation password'
      )
    }

    if (!USER_ROLE.includes(role)) {
      throw new BadRequestException('Invalid user role')
    }

    const lowerCasedEmail = email.toLowerCase()
    const allowedEmails: string[] = process.env.ALLOWED_EMAILS.split(',')
    const emailDomain = lowerCasedEmail.split('@')[1]
    if (!allowedEmails.includes(emailDomain)) {
      throw new BadRequestException('Invalid email address')
    }

    const isUserExists = await this.penggunaRepository.findByEmail(email)
    if (isUserExists) {
      throw new ConflictException('User already exists')
    }

    const agentRegistration = await this.pendaftaranAgenRepository.findByEmail(
      email
    )
    if (agentRegistration) {
      if (agentRegistration.statusPendaftaran === 'DIAJUKAN') {
        throw new ConflictException('Agent registration is being processed')
      }
    }

    let userRole: RolePengguna
    if (role === 'ADMIN') {
      userRole = 'ADMIN'
    } else if (role === 'AGEN') {
      userRole = 'AGEN'
    } else {
      userRole = 'TRAVELER'
    }

    if (userRole === 'AGEN') {
      await this.pendaftaranAgenRepository.deleteByEmail(email)
    }

    const hashedPassword = await hash(
      password,
      parseInt(process.env.APP_SALT_ROUNDS)
    )

    if (userRole === 'AGEN') {
      await this.pendaftaranAgenRepository.create({
        email: email,
        password: hashedPassword,
        nama: nama,
      })
    } else {
      const user = await this.penggunaRepository.create({
        email: email,
        password: hashedPassword,
        nama: nama,
        role: userRole,
      })

      const accessToken = await this.generateAccessToken(user.id)
      const finalizedUser = this.getFinalizedUser(user)

      return {
        accessToken: accessToken,
        user: finalizedUser,
      }
    }
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.penggunaRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password')
    }

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Email or Password')
    }

    const accessToken = await this.generateAccessToken(user.id)
    const finalizedUser = this.getFinalizedUser(user)

    return {
      accessToken: accessToken,
      user: finalizedUser,
    }
  }

  private async generateAccessToken(key: string) {
    const accessToken = await this.jwtService.signAsync(
      { key },
      {
        secret: process.env.APP_ACCESS_SECRET,
        expiresIn: process.env.APP_ACCESS_EXPIRY,
      }
    )

    return accessToken
  }

  private getFinalizedUser(user: Pengguna) {
    const finalizedUser: FinalizedUserInterface = {
      email: user.email,
      nama: user.nama,
    }

    return finalizedUser
  }
}
