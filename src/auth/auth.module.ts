import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { RepositoryModule } from 'src/repository/repository.module'

@Module({
  imports: [JwtModule.register({}), RepositoryModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
