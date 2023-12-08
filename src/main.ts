import { ValidationPipe, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as fs from 'fs'

async function bootstrap() {
  const https = process.env.APP_OPEN_HTTPS
  console.log(https)
  const httpsOptions = {
    key: fs.readFileSync(process.env.APP_KEY),
    cert: fs.readFileSync(process.env.APP_CERT),
  }
  console.log(httpsOptions)
  const app = await NestFactory.create(AppModule, { httpsOptions })
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: process.env.APP_ALLOWED_ORIGIN,
    credentials: true,
  })

  if (https) await app.listen(443)
  else await app.listen(process.env.APP_PORT ?? 3000)

  Logger.log(`Listening on ${await app.getUrl()}`)
}
bootstrap()
