export const _return = `
  RETURN DISTINCT person {
    .*,
    id: id(person),
    movies: [ (person)-[r]->(movie:Movie) | movie { .*, id: id(movie), relationship: type(r) } ]
  }
`;
