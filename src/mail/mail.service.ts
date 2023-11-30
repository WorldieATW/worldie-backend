import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { google } from 'googleapis'
import { Options } from 'nodemailer/lib/smtp-transport'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    })

    const accessTokenResponse = await oauth2Client.getAccessToken()
    const accessToken = accessTokenResponse.token

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken,
      },
    }
    this.mailerService.addTransporter('gmail', config)
  }

  public async sendMail(to: string, name: string, template: string) {
    await this.setTransport()
    try {
      const result = await this.mailerService.sendMail({
        transporterName: 'gmail',
        to,
        from: process.env.EMAIL,
        subject: 'Pendaftaran Agen Worldie',
        template,
        context: {
          name,
        },
      })

      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }
}
