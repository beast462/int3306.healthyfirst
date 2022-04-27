import { Entities } from '@/common/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKeys } from './config.module';

export type SupportedDatabaseTypes = 'mysql' | 'postgres' | 'mariadb' | 'mssql';
export const SupportedDatabaseTypes = ['mysql', 'postgres', 'mariadb', 'mssql'];

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: configService.get<SupportedDatabaseTypes>(ConfigKeys.DATABASE_TYPE),
    host: configService.get<string>(ConfigKeys.DATABASE_HOST),
    port: configService.get<number>(ConfigKeys.DATABASE_PORT),
    username: configService.get<string>(ConfigKeys.DATABASE_USERNAME),
    password: configService.get<string>(ConfigKeys.DATABASE_PASSWORD),
    database: configService.get<string>(ConfigKeys.DATABASE_NAME),
    entities: Entities,
    synchronize:
      configService.get<string>(ConfigKeys.ENVIRONMENT) === 'development',
    autoLoadEntities: true,
  }),
});
