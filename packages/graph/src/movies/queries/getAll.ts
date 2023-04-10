import { _return } from './_return';

export const getAll = `
  WITH toLower($search) AS search
  MATCH (movie:Movie)
  OPTIONAL MATCH (person:Person)-[r]->(movie)
  WITH *
  WHERE
    search IS NULL
    OR search = ""
    OR toLower(movie.title) CONTAINS search
    OR toLower(person.name) CONTAINS search
  WITH movie
  ${_return}
  ORDER BY movie.title
`;
