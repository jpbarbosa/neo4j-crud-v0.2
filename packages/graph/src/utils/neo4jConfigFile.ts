import * as fs from 'fs';

export type Neo4jContainerConfig = {
  url: string;
  username: string;
  password: string;
};

export const neo4jConfigFile = (filename = './.neo4jContainerConfig.json') => ({
  read: async (): Promise<Neo4jContainerConfig> => {
    const neo4jContainerConfigFile = fs.readFileSync(filename);
    return JSON.parse(neo4jContainerConfigFile.toString());
  },

  write: async (neo4jContainerConfig: Neo4jContainerConfig) => {
    fs.writeFileSync(filename, JSON.stringify(neo4jContainerConfig, null, 2));
  },
});
