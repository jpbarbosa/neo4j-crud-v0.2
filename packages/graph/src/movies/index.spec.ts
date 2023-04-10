import { Driver, Session } from 'neo4j-driver';
import { Movie, movies as sampleMovies } from '@neo4j-crud/shared';
import * as graph from '.';
import { neo4jDriver } from '../utils/neo4jDriver';
import {
  neo4jConfigFile,
  Neo4jContainerConfig,
} from '../utils/neo4jConfigFile';
import { ignoreId } from '../utils/ignoreId';

export const expectMoviesToBeEqual = (movie1: Movie, movie2: Movie) => {
  const movie1Parsed = ignoreId(movie1);
  const movie2Parsed = ignoreId(movie2);

  expect(movie1Parsed.title).toEqual(movie2Parsed.title);
  expect(movie1Parsed.tagline).toEqual(movie2Parsed.tagline);
  expect(movie1Parsed.released).toEqual(movie2Parsed.released);

  Object.keys(movie1Parsed.people).forEach((key) => {
    expect(movie1Parsed.people[key]).toIncludeSameMembers(
      movie2Parsed.people[key]
    );
  });
};

describe('graph.movies', () => {
  jest.setTimeout(180_000);

  let neo4jConfig: Neo4jContainerConfig;
  let driver: Driver;
  let session: Session;
  const sampleMovie = sampleMovies[0];

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

  it('should create a movie', async () => {
    const movie = await graph.movies(session).create(sampleMovie);
    expectMoviesToBeEqual(movie, sampleMovie);
  });

  it('should get the previously created movie', async () => {
    const [movie] = await graph.movies(session).getAll(sampleMovie.title);
    expectMoviesToBeEqual(movie, sampleMovie);
  });

  it('should update movie tagline', async () => {
    const [movie] = await graph.movies(session).getAll(sampleMovie.title);
    movie.tagline += ' updated';
    const updatedMovie = await graph.movies(session).update(movie.id, movie);
    expectMoviesToBeEqual(updatedMovie, movie);
  });

  it('should add one actor and one reviewer to the movie', async () => {
    const [movie] = await graph.movies(session).getAll(sampleMovie.title);
    movie.people.actors.push({
      name: 'Clancy Brown',
      born: 1959,
      roles: ['Captain Andrew Ryan'],
    });
    const updatedMovie = await graph.movies(session).update(movie.id, movie);
    expectMoviesToBeEqual(updatedMovie, movie);
  });

  it('should remove one actor and one reviewer from the movie', async () => {
    const [movie] = await graph.movies(session).getAll(sampleMovie.title);
    movie.people.actors.pop();
    movie.people.reviewers.pop();
    const updatedMovie = await graph.movies(session).update(movie.id, movie);
    expectMoviesToBeEqual(updatedMovie, movie);
  });

  it('should delete the movie', async () => {
    const [movie] = await graph.movies(session).getAll(sampleMovie.title);
    const result = await graph.movies(session).remove(movie.id);
    const movies = await graph.movies(session).getAll(sampleMovie.title);
    expect(movies).toHaveLength(0);
  });
});
