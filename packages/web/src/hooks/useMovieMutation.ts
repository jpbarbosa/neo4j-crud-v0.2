import { MutationKey, useMutation } from 'react-query';
import { AxiosCustomError, Movie } from '@neo4j-crud/shared';
import * as api from '../api';

export const useMovieMutation = (
  mutationKey: MutationKey,
  callback: (message: string) => void
) => {
  const upsert = useMutation<Movie, AxiosCustomError, Movie>(
    mutationKey,
    (movie) => {
      if (movie.id) {
        return api.movies.update(movie.id, movie);
      } else {
        return api.movies.create(movie);
      }
    },
    {
      onSuccess: () => {
        callback(`Movie created/updated successfully`);
      },
    }
  );

  const remove = useMutation<Movie | void, AxiosCustomError, Movie>(
    mutationKey,
    (movie) => {
      if (movie.id) {
        return api.movies.remove(movie.id);
      } else {
        return Promise.resolve();
      }
    },
    {
      onSuccess: () => {
        callback(`Movie deleted successfully`);
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
