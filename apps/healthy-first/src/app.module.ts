import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ViewModule } from './view/view.module';
import configModule, { ConfigKeys } from './base/config.module';
import { PingController } from './ping/ping.controller';
import typeOrmModule from './base/type-orm.module';

@Module({
  imports: [configModule, typeOrmModule, ViewModule],
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
