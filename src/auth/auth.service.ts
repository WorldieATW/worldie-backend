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
import { FinalizeUser } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
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

    const isUserExists = await this.prisma.pengguna.findUnique({
      where: {
        email: email,
      },
    })

    if (isUserExists) {
      throw new ConflictException('User already exists')
    }

    const hashedPassword = await hash(
      password,
      parseInt(process.env.APP_SALT_ROUNDS)
    )

    let userRole: RolePengguna
    if (role === 'ADMIN') {
      userRole = 'ADMIN'
    } else if (role === 'AGEN') {
      userRole = 'AGEN'
    } else {
      userRole = 'TRAVELER'
    }

    const user = await this.prisma.pengguna.create({
      data: {
        email: email,
        password: hashedPassword,
        nama: nama,
        role: userRole,
      },
    })

    const accessToken = await this.generateAccessToken(user.id)
    const finalizeUser = this.getFinalizeUser(user)

    return {
      accessToken: accessToken,
      user: finalizeUser,
    }
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.prisma.pengguna.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Email or Password')
    }

    const accessToken = await this.generateAccessToken(user.id)
    const finalizeUser = this.getFinalizeUser(user)

    return {
      accessToken: accessToken,
      user: finalizeUser,
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

  private getFinalizeUser(user: Pengguna) {
    const finalizeUser: FinalizeUser = {
      email: user.email,
      nama: user.nama,
    }

    return finalizeUser
  }
}
