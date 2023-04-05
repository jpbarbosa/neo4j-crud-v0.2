export const getById = `
  MATCH (movie:Movie)
  WHERE id(movie) = $id
  RETURN movie {
    .*,
    id: id(movie)
  }
`;
