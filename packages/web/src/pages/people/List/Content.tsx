import { useQuery } from 'react-query';
import { AxiosCustomError, Person } from '@neo4j-crud/shared';
import * as api from '../../../api';
import { useDebounce } from '../../../hooks/useDebounce';
import { AlertCombo } from '../../../components';
import { Item } from './Item';

type ContentProps = {
  search: string;
};

export const Content: React.FC<ContentProps> = ({ search }) => {
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isLoading } = useQuery<Person[], AxiosCustomError>(
    ['people', debouncedSearch],
    () => api.people.getAll(search)
  );

  if (error || isLoading || !data) {
    return <AlertCombo error={error} isLoading={isLoading} data={data} />;
  }

  return (
    <ul className="record-list">
      {data.map((person) => (
        <Item key={person.id} person={person} search={search} />
      ))}
    </ul>
  );
};
