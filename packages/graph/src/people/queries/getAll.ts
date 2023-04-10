import { _return } from './_return';

export const getAll = `
  WITH toLower($search) AS search
  MATCH (person:Person)
  OPTIONAL MATCH (person)-[r]->(movie:Movie)
  WITH *
  WHERE
    search IS NULL
    OR search = ""
    OR toLower(movie.title) CONTAINS search
    OR toLower(person.name) CONTAINS search
  WITH person
  ${_return}
  ORDER BY person.name
`;
