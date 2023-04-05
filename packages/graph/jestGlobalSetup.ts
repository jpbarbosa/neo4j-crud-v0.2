import { Neo4jContainer, StartedNeo4jContainer } from 'testcontainers';
import { neo4jDriver } from './src/utils/neo4jDriver';
import { neo4jConfigFile } from './src/utils/neo4jConfigFile';

const setup = async (): Promise<void> => {
  let container: StartedNeo4jContainer | undefined = undefined;

  try {
    const neo4jConfig = await neo4jConfigFile().read();
    const driver = await neo4jDriver(neo4jConfig);
    const serverInfo = await driver.getServerInfo();
    console.info(`\nNeo4j container found at ${serverInfo.address}`);
  } catch (e) {
    console.info(`\nNeo4j container is being created...`);

    container = await new Neo4jContainer().withReuse().withApoc().start();

    await neo4jConfigFile().write({
      url: container.getBoltUri(),
      username: container.getUsername(),
      password: container.getPassword(),
    });
  }
};

export default setup;
