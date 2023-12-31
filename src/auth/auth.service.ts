import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDTO, RegistrationDTO } from './auth.DTO'
import { hash, compare } from 'bcrypt'
import { USER_ROLE } from './auth.constant'
import { Pengguna, RolePengguna } from '@prisma/client'
import { FinalizedUserInterface } from './auth.interface'
import { RepositoryService } from 'src/repository/repository.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: RepositoryService
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

    const isUserExists = await this.repository.pengguna.findByEmail(email)
    if (isUserExists) {
      throw new ConflictException('User already exists')
    }

    const agentRegistration = await this.repository.pendaftaranAgen.findByEmail(
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

    if (userRole === 'AGEN' && agentRegistration) {
      await this.repository.pendaftaranAgen.deleteByEmail(email)
    }

    const hashedPassword = await hash(
      password,
      parseInt(process.env.APP_SALT_ROUNDS)
    )

    if (userRole === 'AGEN') {
      await this.repository.pendaftaranAgen.create({
        email: email,
        password: hashedPassword,
        nama: nama,
      })
    } else {
      const user = await this.repository.pengguna.create({
        email: email,
        password: hashedPassword,
        nama: nama,
        role: userRole,
      })

      const accessToken = await this.generateAccessToken({
        id: user.id,
        nama: nama,
        role: userRole,
      })

      return { accessToken: accessToken }
    }
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.repository.pengguna.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password')
    }

    const isValidPassword = await compare(password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Email or Password')
    }

    const { id, nama, role } = user
    const accessToken = await this.generateAccessToken({
      id: id,
      nama: nama,
      role: role,
    })

    return { accessToken: accessToken }
  }

  async refresh(user: Pengguna) {
    const { id, nama, role } = user
    const accessToken = await this.generateAccessToken({
      id: id,
      nama: nama,
      role: role,
    })

    return { accessToken: accessToken }
  }

  private async generateAccessToken(key: FinalizedUserInterface) {
    const accessToken = await this.jwtService.signAsync(
      { key },
      {
        secret: process.env.APP_ACCESS_SECRET,
        expiresIn: process.env.APP_ACCESS_EXPIRY,
      }
    )

    return accessToken
  }
}
