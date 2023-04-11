import { Movie } from '@neo4j-crud/shared';
import axios from 'axios';

const url = `${import.meta.env.VITE_API_URL}/movies`;

export const movies = {
  getAll: (search: string) =>
    axios.get<Movie[]>(`${url}?search=${search}`).then((res) => res.data),

  getById: (id: number) =>
    axios.get<Movie>(`${url}/${id}`).then((res) => res.data),

  create: (movie: Movie) =>
    axios.post<Movie>(url, movie).then((res) => res.data),

  update: (id: number, movie: Movie) =>
    axios.put<Movie>(`${url}/${id}`, movie).then((res) => res.data),

  remove: (id: number) =>
    axios.delete<Movie>(`${url}/${id}`).then((res) => res.data),
};
