export interface Movie {
  id: number;
  title: string;
  released: number;
  tagline: string;
}

export interface MoviesQueryResult {
  movie: Movie;
}
