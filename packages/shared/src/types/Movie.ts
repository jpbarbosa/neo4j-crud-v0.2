import { Node, Integer } from 'neo4j-driver';
import { Actor, Director, Producer, Reviewer, Writer } from './People';

export type MoviePerson = Actor | Director | Producer | Reviewer | Writer;

export type Movie = {
  id: number;
  title: string;
  released: number;
  tagline: string;
  people: {
    actors: Actor[];
    directors: Director[];
    producers: Producer[];
    writers: Writer[];
    reviewers: Reviewer[];
  };
};

export type MoviesQueryResult = {
  movie: Movie;
};
