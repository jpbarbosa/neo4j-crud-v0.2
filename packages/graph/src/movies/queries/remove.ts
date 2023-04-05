export const remove = `
  MATCH (movie:Movie)
  WHERE id(movie) = $id
  DETACH DELETE movie
`;
