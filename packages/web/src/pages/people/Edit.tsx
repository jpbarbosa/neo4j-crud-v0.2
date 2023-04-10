import { AxiosCustomError, Person } from '@neo4j-crud/shared';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { api } from '../../api';
import { AlertCombo } from '../../components';
import { Form } from './Form';

export const Edit = () => {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : undefined;

  const { data, error, isLoading } = useQuery<Person, AxiosCustomError>(
    ['people', id],
    () => api.people.getById(Number(id))
  );

  if (error || isLoading || !data) {
    return <AlertCombo error={error} isLoading={isLoading} data={data} />;
  }

  return <Form person={data} />;
};
