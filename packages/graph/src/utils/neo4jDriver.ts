import neo4j, { Driver } from 'neo4j-driver';
import { Neo4jContainerConfig } from './neo4jConfigFile';

export const neo4jDriver = async ({
  url,
  username,
  password,
}: Neo4jContainerConfig): Promise<Driver> => {
  const auth = neo4j.auth.basic(username, password);
  const driver = neo4j.driver(url, auth, {
    disableLosslessIntegers: true,
  });
  return driver;
};
