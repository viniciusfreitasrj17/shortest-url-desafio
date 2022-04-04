import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export const createDatabaseConn = async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions('default');
  return createConnection({ ...connectionOptions, name: 'default' });
};
