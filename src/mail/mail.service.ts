import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import { google } from 'googleapis'
import { Options } from 'nodemailer/lib/smtp-transport'

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2
    const oauth2Client = new OAuth2(
      process.env.MAILING_CLIENT_ID,
      process.env.MAILING_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.MAILING_REFRESH_TOKEN,
    })

    const accessTokenResponse = await oauth2Client.getAccessToken()
    const accessToken = accessTokenResponse.token

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAILING_EMAIL,
        clientId: process.env.MAILING_CLIENT_ID,
        clientSecret: process.env.MAILING_CLIENT_SECRET,
        accessToken,
      },
    }
    this.mailerService.addTransporter('gmail', config)
  }

  public async sendMail(to: string, name: string, template: string) {
    try {
      await this.setTransport()
      const result = await this.mailerService.sendMail({
        transporterName: 'gmail',
        to,
        from: process.env.MAILING_EMAIL,
        subject: 'Pendaftaran Agen Worldie',
        template,
        context: {
          name,
          email: process.env.MAILING_EMAIL,
        },
      })

      Logger.log(result, 'Send Mail Success')
    } catch (err) {
      Logger.log(err, 'Send Mail Failed')
    }
  }
}
