export const getAll = `
  WITH toLower($search) AS search
  MATCH (movie:Movie)
  WHERE
    search IS NULL
    OR search = ""
    OR toLower(movie.title) CONTAINS search
  RETURN movie {
    .*,
    id: id(movie)
  }
  ORDER BY movie.title
`;
