import { Session } from 'neo4j-driver';
import { PeopleQueryResult, Person } from '@neo4j-crud/shared';
import * as queries from './queries';

export const people = (session: Session) => ({
  getAll: async (search = '') => {
    const result = await session.run<PeopleQueryResult>(queries.getAll, {
      search,
    });

    const records = result.records.map((record) => record.get('person'));

    return records;
  },

  getById: async (id: number) => {
    const result = await session.run<PeopleQueryResult>(queries.getById, {
      id,
    });

    const records = result.records.map((record) => record.get('person'));

    return records.pop();
  },

  update: async (id: number, person: Person) => {
    const result = await session.run<PeopleQueryResult>(queries.update, {
      id,
      person,
    });

    const records = result.records.map((record) => record.get('person'));

    return records.pop();
  },

  create: async (person: Person) => {
    const result = await session.run<PeopleQueryResult>(queries.create, {
      person,
    });

    const records = result.records.map((record) => record.get('person'));

    return records.pop();
  },

  remove: async (id: number) => {
    const result = await session.run<PeopleQueryResult>(queries.remove, {
      id,
    });

    const records = result.records.map((record) => record.get('person'));

    return records.pop();
  },
});
