import { useQuery } from 'react-query';
import { AxiosCustomError, Movie } from '@neo4j-crud/shared';
import { useDebounce } from '../../../hooks/useDebounce';
import { Item } from './Item';
import { AlertCombo } from '../../../components';
import * as api from '../../../api';

type ContentProps = {
  search: string;
};

export const Content: React.FC<ContentProps> = ({ search }) => {
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isLoading } = useQuery<Movie[], AxiosCustomError>(
    ['movies', debouncedSearch],
    () => api.movies.getAll(search)
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
