import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CommonModule } from './common/common.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import { JwtModule } from '@nestjs/jwt'
import { TravelerModule } from './traveler/traveler.module'
import { WorldPostManagerModule } from './world-post-manager/world-post-manager.module'
import { RepositoryModule } from './repository/repository.module'
import { AsetUsahaModule } from './aset-usaha/aset-usaha.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({}),
    PrismaModule,
    AuthModule,
    CommonModule,
    TravelerModule,
    WorldPostManagerModule,
    RepositoryModule,
    AsetUsahaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
