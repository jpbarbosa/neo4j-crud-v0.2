export type Movie = {
  id: number;
  title: string;
  released: number;
  tagline: string;
};

export type MoviesQueryResult = {
  movie: Movie;
};
