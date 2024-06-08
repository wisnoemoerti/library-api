import { registerAs } from '@nestjs/config';
import { TypeOrmConfig } from '../../constants';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const config = TypeOrmConfig;

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(
  config as DataSourceOptions & SeederOptions,
);
