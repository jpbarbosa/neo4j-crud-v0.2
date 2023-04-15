export const get = `
  WITH toLower($search) AS search
  MATCH (person:Person)-[r]->(movie:Movie)
  WHERE
    search IS NULL
    OR search = ""
    OR toLower(movie.title) CONTAINS search
    OR toLower(person.name) CONTAINS search
  RETURN *
`;
