import { ValidationPipe, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as fs from 'fs'

async function bootstrap() {
  const https = process.env.APP_OPEN_HTTPS
  const httpsOptions = https
    ? {
        key: fs.readFileSync(process.env.APP_KEY),
        cert: fs.readFileSync(process.env.APP_CERT),
      }
    : {}
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: process.env.APP_ALLOWED_ORIGIN,
    credentials: true,
  })

  const appPort = https ? 443 : process.env.APP_PORT
  await app.listen(appPort ?? 3000)

  Logger.log(`Listening on ${await app.getUrl()}`)
}
bootstrap()
