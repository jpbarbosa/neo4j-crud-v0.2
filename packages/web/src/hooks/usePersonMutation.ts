import { AxiosCustomError, Person } from '@neo4j-crud/shared';
import { MutationKey, useMutation } from 'react-query';
import { api } from '../api';

export const usePersonMutation = (
  mutationKey: MutationKey,
  callback: (message: string) => void
) => {
  const upsert = useMutation<Person, AxiosCustomError, Person>(
    mutationKey,
    (person) => {
      if (person.id) {
        return api.people.update(person.id, person);
      } else {
        return api.people.create(person);
      }
    },
    {
      onSuccess: () => {
        callback(`Person created/updated successfully`);
      },
    }
  );

  const remove = useMutation<Person | void, AxiosCustomError, Person>(
    mutationKey,
    (person) => {
      if (person.id) {
        return api.people.remove(person.id);
      } else {
        return Promise.resolve();
      }
    },
    {
      onSuccess: () => {
        callback(`Person deleted successfully`);
      },
    }
  );

  const isSuccess = upsert.isSuccess || remove.isSuccess;

  const error = upsert.error || remove.error;

  return {
    upsert,
    remove,
    isSuccess,
    error,
  };
};
