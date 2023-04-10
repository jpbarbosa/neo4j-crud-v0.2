import { _return } from './_return';

const createRelationships = ({
  key,
  collection,
}: {
  key: string;
  collection: string;
}) => `
  WITH movie

  CALL {
    WITH movie
    UNWIND $movie.people.${collection} AS person
    MERGE (personNode:Person {
      name: person.name
    })
    SET
      personNode.born = person.born
    MERGE (personNode)-[r:${key}]->(movie)
    ${key === 'ACTED_IN' ? 'SET r.roles = person.roles' : ''}
    RETURN collect(personNode) AS ${collection}
  }
`;

export const create = `
  CREATE (movie:Movie)
  SET
    movie.title = $movie.title,
    movie.released = $movie.released,
    movie.tagline = $movie.tagline

  WITH movie

  ${createRelationships({ key: 'ACTED_IN', collection: 'actors' })}
  ${createRelationships({ key: 'DIRECTED', collection: 'directors' })}
  ${createRelationships({ key: 'PRODUCED', collection: 'producers' })}
  ${createRelationships({ key: 'WROTE', collection: 'writers' })}
  ${createRelationships({ key: 'REVIEWED', collection: 'reviewers' })}

  ${_return}
`;
