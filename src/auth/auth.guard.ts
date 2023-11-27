import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthenticatedRequestInterface } from './auth.interface'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequestInterface>()

    Logger.log(req.body, `Req ${req.method} ${req.url} from ${req.ips}`)

    if (this.getPublicStatus(ctx)) return true

    const rawToken = this.extractTokenFromHeader(req)
    if (rawToken) {
      try {
        const { key: userId } = await this.jwtService.verifyAsync(rawToken, {
          secret: process.env.APP_ACCESS_SECRET,
        })

        const user = await this.prisma.pengguna.findUnique({
          where: {
            id: userId,
          },
        })

        if (user) {
          req.user = user
          return true
        } else {
          throw new UnauthorizedException('Invalid Token')
        }
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new UnauthorizedException('Token expired')
        } else {
          throw new UnauthorizedException('Invalid Token')
        }
      }
    }

    return false
  }

  private getPublicStatus(ctx: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>('isPublic', [
      ctx.getHandler(),
      ctx.getClass(),
    ])
  }

  private extractTokenFromHeader(req: AuthenticatedRequestInterface) {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
