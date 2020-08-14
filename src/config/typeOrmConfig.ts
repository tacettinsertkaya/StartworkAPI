import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '37.230.108.234',
  port: 3306,
  username: 'dev_user',
  password: 'Ts&912513',
  database: 'tsertka1_startDB',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  dropSchema: false,
  subscribers: [__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
};

/***
 * 
 *   type: 'mysql',
  host: '37.230.108.234',
  port: 3306,
  username: 'dev_user',
  password: 'Ts&912513',
  database: 'tsertka1_startDB',

  //localhost
   host: 'localhost',
  port: 3306,
  username: 'abraham',
  password: '12345',
  database: 'nest_security',

 */
