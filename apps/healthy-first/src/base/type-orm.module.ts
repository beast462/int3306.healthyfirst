import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeys } from './config.module';

export type SupportedDatabaseTypes = 'mysql' | 'postgres' | 'mariadb' | 'mssql';
export const SupportedDatabaseTypes = ['mysql', 'postgres', 'mariadb', 'mssql'];

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: configService.get<SupportedDatabaseTypes>(ConfigKeys.DATABASE_TYPE),
      host: configService.get<string>(ConfigKeys.DATABASE_HOST),
      port: configService.get<number>(ConfigKeys.DATABASE_PORT),
      username: configService.get<string>(ConfigKeys.DATABASE_USERNAME),
      password: configService.get<string>(ConfigKeys.DATABASE_PASSWORD),
      name: configService.get<string>(ConfigKeys.DATABASE_NAME),
    };
  },
});
