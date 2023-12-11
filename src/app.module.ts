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
import { ReviewModule } from './review/review.module'
import { RepositoryModule } from './repository/repository.module'
import { PendaftaranAgenModule } from './pendaftaran-agen/pendaftaran-agen.module'
import { MailModule } from './mail/mail.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { AsetUsahaModule } from './aset-usaha/aset-usaha.module'

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
    ReviewModule,
    PendaftaranAgenModule,
    MailModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir:
          process.env.NODE_ENV === 'production'
            ? '/dist/mail/templates/'
            : process.cwd() + '/src/mail/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
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
