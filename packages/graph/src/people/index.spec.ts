import { Driver, Session } from 'neo4j-driver';
import { Person, people as samplePeople } from '@neo4j-crud/shared';
import * as graph from './';
import { neo4jDriver } from '../utils/neo4jDriver';
import {
  neo4jConfigFile,
  Neo4jContainerConfig,
} from '../utils/neo4jConfigFile';
import { ignoreId } from '../utils/ignoreId';

export const expectPeopleToBeEqual = (person1: Person, person2: Person) => {
  const person1Parsed = ignoreId(person1);
  const person2Parsed = ignoreId(person2);

  expect(person1Parsed.name).toEqual(person2Parsed.name);
  expect(person1Parsed.born).toEqual(person2Parsed.born);
};

describe('graph.people', () => {
  jest.setTimeout(180_000);

  let neo4jConfig: Neo4jContainerConfig;
  let driver: Driver;
  let session: Session;
  const samplePerson = samplePeople[0];

  const clearDatabase = async () => {
    await session.run('MATCH (n) DETACH DELETE n');
  };

  beforeAll(async () => {
    neo4jConfig = await neo4jConfigFile().read();
    driver = await neo4jDriver(neo4jConfig);
    session = driver.session();
    await clearDatabase();
  });

  afterAll(async () => {
    await session.close();
    await driver.close();
    //await container.stop();
  });

  it('should create a person', async () => {
    const person = await graph.people(session).create(samplePerson);
    expectPeopleToBeEqual(person, samplePerson);
  });

  it('should get the previously created person', async () => {
    const [person] = await graph.people(session).getAll(samplePerson.name);
    expectPeopleToBeEqual(person, samplePerson);
  });

  it('should update person tagline', async () => {
    const [person] = await graph.people(session).getAll(samplePerson.name);
    person.name += ' updated';
    const updatedPerson = await graph.people(session).update(person.id, person);
    expectPeopleToBeEqual(updatedPerson, person);
  });

  it('should delete the person', async () => {
    const [person] = await graph.people(session).getAll(samplePerson.name);
    await graph.people(session).remove(person.id);
    const people = await graph.people(session).getAll(samplePerson.name);
    expect(people).toHaveLength(0);
  });
});
