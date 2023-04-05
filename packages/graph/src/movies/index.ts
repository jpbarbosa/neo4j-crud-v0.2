import { Session } from 'neo4j-driver';
import { MoviesQueryResult } from '@neo4j-crud/shared';

export const movies = (session: Session) => ({
  getAll: async () => {
    const result = await session.run<MoviesQueryResult>(
      `
      MATCH (movie:Movie)
      RETURN movie {
        .*,
        id: id(movie)
      }
      ORDER BY movie.title
      `
    );

    const records = result.records.map((record) => record.get('movie'));

    return records;
  },
});
