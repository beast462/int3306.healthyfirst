import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthGuardModule } from './auth-guard/auth-guard.module';
import configModule, { ConfigKeys } from './base/config.module';
import typeOrmModule from './base/type-orm.module';
import { MailModule } from './mail/mail.module';
import { PingController } from './ping/ping.controller';
import { RequestIdentifierModule } from './request-identifier/request-identifier.module';
import { UserModule } from './user/user.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    configModule,
    typeOrmModule,
    ViewModule,
    UserModule,
    RequestIdentifierModule,
    AuthGuardModule,
    MailModule,
  ],
  controllers: [PingController],
  providers: [ConfigService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly configService: ConfigService) {
    this.logger.log(
      `AppInstance is listening on port ${this.configService.get<number>(
        ConfigKeys.SERVER_PORT,
      )}`,
    );
  }
}
