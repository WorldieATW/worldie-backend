import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { AuthenticatedRequestInterface } from './auth.interface'
import { Pengguna } from '@prisma/client'
import { ROLE_PERMISSION } from './auth.constant'
import { RepositoryService } from 'src/repository/repository.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly repository: RepositoryService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequestInterface>()

    Logger.log(
      request.body,
      `Req ${request.method} ${request.url} from ${request.ips}`
    )

    if (this.getMetadataStatus(context, 'isPublic')) return true

    const rawToken = this.extractTokenFromHeader(request)
    if (rawToken) {
      try {
        const { key } = await this.jwtService.verifyAsync(rawToken, {
          secret: process.env.APP_ACCESS_SECRET,
        })

        const { id } = key
        const user = await this.repository.pengguna.findById(id)
        if (user) {
          request.user = user
          return this.getPermissionStatus(context, user)
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

  private getMetadataStatus(context: ExecutionContext, metadata: string) {
    return this.reflector.getAllAndOverride<boolean>(metadata, [
      context.getHandler(),
      context.getClass(),
    ])
  }

  private extractTokenFromHeader(req: AuthenticatedRequestInterface) {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  private getPermissionStatus(context: ExecutionContext, user: Pengguna) {
    const { role } = user

    for (const index in ROLE_PERMISSION) {
      if (this.getMetadataStatus(context, ROLE_PERMISSION[index].metada)) {
        if (role !== ROLE_PERMISSION[index].role) return false
      }
    }

    return true
  }
}
