export const update = `
  MATCH (movie:Movie)
  WHERE id(movie) = $id
  SET
    movie.title = $movie.title,
    movie.released = $movie.released,
    movie.tagline = $movie.tagline

  RETURN movie {
    .*,
    id: id(movie)
  }
`;
