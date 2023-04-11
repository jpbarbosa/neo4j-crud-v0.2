import axios from 'axios';
import { GraphVisData } from 'react-graph-vis';

const url = `${import.meta.env.VITE_API_URL}/shortest-path`;

export const shortestPath = {
  get: (person1: string, person2: string) =>
    axios
      .get<GraphVisData>(`${url}?person1=${person1}&person2=${person2}`)
      .then((res) => res.data),
};
