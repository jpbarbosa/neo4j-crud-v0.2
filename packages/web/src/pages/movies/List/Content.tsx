import axios from 'axios';
import { AxiosCustomError, Movie } from '@neo4j-crud/shared';
import { useQuery } from 'react-query';

const url = `${import.meta.env.VITE_API_URI}/movies`;

export const Content: React.FC = () => {
  const { data, error, isLoading } = useQuery<Movie[], AxiosCustomError>(
    ['movies'],
    () => axios.get<Movie[]>(url).then((res) => res.data)
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data.</div>;
  }

  return (
    <ul className="record-list">
      {data?.map((movie) => (
        <li>{movie.title}</li>
      ))}
    </ul>
  );
};
