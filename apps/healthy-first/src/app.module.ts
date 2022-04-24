import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import configModule from './base/config.module';

@Module({
  imports: [configModule],
  providers: [ConfigService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly configService: ConfigService) {
    this.logger.log(
      `AppInstance is listening on port ${this.configService.get<number>(
        'port',
      )}`,
    );
  }
}
