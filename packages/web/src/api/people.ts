import axios from 'axios';
import { Person } from '@neo4j-crud/shared';

const url = `${import.meta.env.VITE_API_URL}/people`;

export const people = {
  getAll: (search = '') =>
    axios.get<Person[]>(`${url}?search=${search}`).then((res) => res.data),

  getById: (id: number) =>
    axios.get<Person>(`${url}/${id}`).then((res) => res.data),

  create: (person: Person) =>
    axios.post<Person>(url, person).then((res) => res.data),

  update: (id: number, person: Person) =>
    axios.put<Person>(`${url}/${id}`, person).then((res) => res.data),

  remove: (id: number) =>
    axios.delete<Person>(`${url}/${id}`).then((res) => res.data),
};
