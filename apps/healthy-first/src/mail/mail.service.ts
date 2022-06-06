import { readdir, readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { createTransport, Transporter } from 'nodemailer';
import { resolve } from 'path';

import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigKeys } from '../base/config.module';

@Injectable({
  scope: Scope.DEFAULT,
})
export class MailService {
  private static readonly templatePath = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'apps',
    'healthy-first',
    'src',
    'mail',
    'templates',
  );
  private readonly transporter: Transporter;
  private readonly templates: Map<string, HandlebarsTemplateDelegate<any>>;
  private readonly emailAddress: string;

  public constructor(configService: ConfigService) {
    this.emailAddress = configService.get(ConfigKeys.EMAIL_USERNAME);

    this.transporter = createTransport({
      host: configService.get<string>(ConfigKeys.EMAIL_HOST),
      port: configService.get<number>(ConfigKeys.EMAIL_PORT),
      secure: true,
      authMethod: 'PLAIN',
      auth: {
        type: 'login',
        user: configService.get<string>(ConfigKeys.EMAIL_USERNAME),
        pass: configService.get<string>(ConfigKeys.EMAIL_PASSWORD),
      },
    });

    this.templates = new Map();

    this.compileTemplates();
  }

  private async compileTemplates(): Promise<void> {
    const templates = await readdir(MailService.templatePath);

    for (const file of templates) {
      const name = file.replace(/\.hbs$/, '');

      this.templates.set(
        name,
        compile(
          await readFile(resolve(MailService.templatePath, file), 'utf8'),
        ),
      );
    }
  }

  public async sendMail(to: string, subject: string, name: string, data: any) {
    const template = this.templates.get(name);

    if (!template) throw new Error(`Template ${name} not found`);

    const content = template(data);

    await this.transporter.sendMail({
      from: `Auto <${this.emailAddress}>`,
      to,
      subject,
      html: content,
    });
  }
}
