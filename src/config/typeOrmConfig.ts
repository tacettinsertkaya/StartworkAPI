import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'abraham',
  password: '12345',
  database: 'tsertka1_startDB',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  dropSchema: false,
  subscribers: [__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
};