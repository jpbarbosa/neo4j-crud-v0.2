import { _return } from './_return';

const updateRelationships = ({
  key,
  collection,
}: {
  key: string;
  collection: string;
}) => {
  return `
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
    RETURN collect(ID(r)) AS relationshipIds
  }

  // Delete old relationships
  CALL {
    WITH movie, relationshipIds
    MATCH (personNode:Person)-[r:${key}]->(movie)
    WHERE NOT ID(r) IN relationshipIds
    DELETE r
    RETURN count(r) AS deleted
  }
  `;
};

export const update = `
  MATCH (movie:Movie)
  WHERE id(movie) = $id
  SET
    movie.title = $movie.title,
    movie.released = $movie.released,
    movie.tagline = $movie.tagline

  ${updateRelationships({ key: 'ACTED_IN', collection: 'actors' })}
  ${updateRelationships({ key: 'DIRECTED', collection: 'directors' })}
  ${updateRelationships({ key: 'PRODUCED', collection: 'producers' })}
  ${updateRelationships({ key: 'WROTE', collection: 'writers' })}
  ${updateRelationships({ key: 'REVIEWED', collection: 'reviewers' })}

  ${_return}
`;
