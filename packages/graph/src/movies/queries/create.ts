export const create = `
  CREATE (movie:Movie)
  SET
    movie.title = $movie.title,
    movie.released = $movie.released,
    movie.tagline = $movie.tagline

  RETURN movie {
    .*,
    id: id(movie)
  }
`;
