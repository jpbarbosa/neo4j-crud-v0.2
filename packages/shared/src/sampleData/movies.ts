import { Movie } from '../types/Movie';

export const movies: Movie[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    released: 1994,
    tagline: 'Fear can hold you prisoner. Hope can set you free.',
    people: {
      actors: [
        {
          name: 'Tim Robbins',
          born: 1958,
          roles: ['Andy Dufresne'],
        },
        {
          name: 'Morgan Freeman',
          born: 1937,
          roles: ['Ellis Boyd "Red" Redding'],
        },
      ],
      directors: [],
      producers: [],
      writers: [],
      reviewers: [],
    },
  },
  {
    id: 2,
    title: 'The Godfather',
    released: 1972,
    tagline: "An offer you can't refuse.",
    people: {
      actors: [
        {
          name: 'Marlon Brando',
          born: 1924,
          roles: ['Don Vito Corleone'],
        },
        {
          name: 'Al Pacino',
          born: 1940,
          roles: ['Michael Corleone'],
        },
      ],
      directors: [],
      producers: [],
      writers: [],
      reviewers: [],
    },
  },
];
