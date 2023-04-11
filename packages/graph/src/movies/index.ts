import { Session } from 'neo4j-driver';
import { Movie, MoviesQueryResult } from '@neo4j-crud/shared';
import * as queries from './queries';

export const movies = (session: Session) => ({
  getAll: async (search = '') => {
    const result = await session.run<MoviesQueryResult>(queries.getAll, {
      search,
    });

    const records = result.records.map((record) => record.get('movie'));

    return records;
  },

  getById: async (id: number) => {
    const result = await session.run<MoviesQueryResult>(queries.getById, {
      id,
    });

    const records = result.records.map((record) => record.get('movie'));

    return records.pop();
  },

  create: async (movie: Movie) => {
    const result = await session.run<MoviesQueryResult>(queries.create, {
      movie,
    });

    const records = result.records.map((record) => record.get('movie'));

    return records.pop();
  },

  update: async (id: number, movie: Movie) => {
    const result = await session.run<MoviesQueryResult>(queries.update, {
      id,
      movie,
    });

    const records = result.records.map((record) => record.get('movie'));

    return records.pop();
  },

  remove: async (id: number) => {
    const result = await session.run<MoviesQueryResult>(queries.remove, {
      id,
    });

    const records = result.records.map((record) => record.get('movie'));

    return records.pop();
  },
});
