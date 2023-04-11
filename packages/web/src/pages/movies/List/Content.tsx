import axios from 'axios';
import { useQuery } from 'react-query';
import { AxiosCustomError, Movie } from '@neo4j-crud/shared';
import { useDebounce } from '../../../hooks/useDebounce';
import { Item } from './Item';
import { AlertCombo } from '../../../components';

const url = `${import.meta.env.VITE_API_URL}/movies`;

type ContentProps = {
  search: string;
};

export const Content: React.FC<ContentProps> = ({ search }) => {
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isLoading } = useQuery<Movie[], AxiosCustomError>(
    ['movies', debouncedSearch],
    () => axios.get<Movie[]>(`${url}?search=${search}`).then((res) => res.data)
  );

  if (error || isLoading || !data) {
    return <AlertCombo error={error} isLoading={isLoading} data={data} />;
  }

  return (
    <ul className="record-list">
      {data.map((movie) => (
        <Item key={movie.id} movie={movie} search={search} />
      ))}
    </ul>
  );
};
