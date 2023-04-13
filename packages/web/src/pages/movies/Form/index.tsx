import { useEffect, useMemo } from 'react';
import { Movie, relationships, stringToTitleCase } from '@neo4j-crud/shared';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMovieMutation } from '../../../hooks/useMovieMutation';
import { ErrorAlert, InputText } from '../../../components';
import { People } from './People';

type FormProps = {
  movie?: Movie;
};

export const Form: React.FC<FormProps> = ({ movie }) => {
  const navigate = useNavigate();

  const defaultValues: Movie = useMemo(
    () =>
      movie || {
        title: '',
        tagline: '',
        released: 0,
        people: {
          actors: [],
          directors: [],
          producers: [],
          writers: [],
          reviewers: [],
        },
      },
    [movie]
  );

  const callback = (message: string) => {
    return navigate('/movies', {
      state: {
        message,
      },
    });
  };

  const { upsert, remove, error } = useMovieMutation(
    ['movies', movie?.id],
    callback
  );

  const { handleSubmit, control, register, reset } = useForm<Movie>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <div>
      <div className="actions-bar">
        <h2>{movie ? 'Edit' : 'Create'} Movie</h2>
        <Link to="/movies" className="button">
          Back to Movies
        </Link>
      </div>
      {error && <ErrorAlert error={error} />}
      <div className="pd-16">
        <form onSubmit={handleSubmit((data) => upsert.mutate(data))}>
          <fieldset className="basic-info">
            <legend>Basic Info</legend>
            <div>
              <label>Title</label>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={(props) => <InputText {...props} />}
              />
            </div>
            <div>
              <label>Tagline</label>
              <Controller
                name="tagline"
                control={control}
                rules={{ required: true }}
                render={(props) => <InputText {...props} />}
              />
            </div>
            <div>
              <label>Released</label>
              <Controller
                name="released"
                control={control}
                rules={{ required: true }}
                render={(props) => <InputText {...props} className="number" />}
              />
            </div>
          </fieldset>
          {relationships.map((relationship) => (
            <fieldset key={relationship.key} className="actors">
              <legend>{stringToTitleCase(relationship.key)}</legend>
              <People
                control={control}
                register={register}
                relationship={relationship}
              />
            </fieldset>
          ))}
          <div className="bottom-actions-bar">
            <input type="submit" />
            {movie && (
              <button
                type="button"
                className="danger"
                onClick={() => remove.mutate(movie)}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
