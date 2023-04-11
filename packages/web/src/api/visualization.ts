import axios from 'axios';
import { GraphVisData } from 'react-graph-vis';

const url = `${import.meta.env.VITE_API_URL}/visualization`;

export const visualization = {
  get: (search: string) =>
    axios.get<GraphVisData>(`${url}?search=${search}`).then((res) => res.data),
};
