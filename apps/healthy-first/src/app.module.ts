import { DbLoggerModule, DbLoggerService } from '@/db-logger';
import { SeederModule } from '@/seeder';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthGuardModule } from './auth-guard/auth-guard.module';
import configModule, { ConfigKeys } from './base/config.module';
import typeOrmModule from './base/type-orm.module';
import { MailModule } from './mail/mail.module';
import { PingController } from './ping/ping.controller';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    configModule,
    typeOrmModule,
    ViewModule,
    UserModule,
    AuthGuardModule,
    MailModule,
    DbLoggerModule,
    RoleModule,
    SeederModule,
  ],
  controllers: [PingController],
  providers: [ConfigService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly dbLoggerService: DbLoggerService,
  ) {
    const initMessage = `AppInstance is listening on port ${this.configService.get<number>(
      ConfigKeys.SERVER_PORT,
    )}`;

    this.logger.verbose(initMessage);

    this.dbLoggerService.verbose(
      'New app instance initialized',
      initMessage,
      'AppModule',
    );
  }
}
