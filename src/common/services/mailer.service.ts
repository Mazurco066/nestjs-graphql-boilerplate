import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { baseResponse } from '../../helpers'

interface IParamsRaw {
  to: string
  subject: string
  text?: string
  html: string
}

interface IParamsContent {
  to: string
  subject: string
  template: string
  context?: any
}

@Injectable()
export class MessageService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Send E-mail method with row html
   * @param params object - Email Sending Params: { to: string, subject: string, text?: string, html: string }
   */
  public async sendRawMail(params: IParamsRaw): Promise<any> {
    return await new Promise<any>((resolve, reject): any => {
      this.mailerService
      .sendMail({
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html
      })
      .then(() => resolve(
        baseResponse(200, 'E-mail successfully sent!')
      ))
      .catch(e => reject(
        baseResponse(500, `Error while sending E-mail: ${e.message}}`)
      ))
    })
  }

  /**
   * Send E-mail method with contexts variables
   * @param params object - Email Sending Params: { to: string, subject: string, template: string, context?: any }
   */
  public async sendTemplateMail(params: IParamsContent): Promise<any> {
    return await new Promise<any>((resolve, reject): any => {
      this.mailerService
        .sendMail({
          to: params.to,
          subject: params.subject,
          template: params.template,
          context: params.context
        })
        .then(() => resolve(
          baseResponse(200, 'E-mail successfully sent!')
        ))
        .catch(e => reject(
          baseResponse(500, `Error while sending E-mail: ${e.message}}`)
        ))
    })
  }
}
