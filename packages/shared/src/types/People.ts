import { Integer, Node, Relationship } from 'neo4j-driver';
import { Movie } from './Movie';

export type PersonMovie = Movie & {
  relationship: string;
};

export type Person = {
  id?: number;
  name: string;
  born?: number;
  movies?: PersonMovie[];
};

export type ActedIn = {
  roles: string[];
};

export type Actor = Person & ActedIn;

export type Director = Person;

export type Producer = Person;

export type Writer = Person;

export type Reviewer = Person;

export type PersonNode = Node<Integer, Person>;

export type ActedInRelationship = Relationship<Integer, ActedIn>;

export type PeopleQueryResult = {
  person: Person;
};
