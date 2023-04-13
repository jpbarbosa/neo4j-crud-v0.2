import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Person } from '@neo4j-crud/shared';
import { usePersonMutation } from '../../../hooks/usePersonMutation';
import { ErrorAlert, InputText } from '../../../components';

type FormProps = {
  person?: Person;
};

export const Form: React.FC<FormProps> = ({ person }) => {
  const navigate = useNavigate();

  const defaultValues: Person = useMemo(
    () =>
      person || {
        name: '',
        born: 0,
      },
    [person]
  );

  const { handleSubmit, control, reset } = useForm<Person>({
    defaultValues,
  });

  const callback = (message: string) => {
    return navigate('/people', {
      state: {
        message,
      },
    });
  };

  const { upsert, remove, error } = usePersonMutation(
    ['people', person?.id],
    callback
  );

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <div>
      <div className="actions-bar">
        <h2>{person ? 'Edit' : 'Create'} Person</h2>
        <Link to="/people" className="button">
          Back to People
        </Link>
      </div>
      {error && <ErrorAlert error={error} />}
      <div className="pd-16">
        <form onSubmit={handleSubmit((data) => upsert.mutate(data))}>
          <fieldset className="basic-info">
            <legend>Basic Info</legend>
            <div>
              <label>Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={(props) => <InputText {...props} />}
              />
            </div>
            <div>
              <label>Born</label>
              <Controller
                name="born"
                control={control}
                rules={{ required: false }}
                render={(props) => <InputText {...props} className="number" />}
              />
            </div>
          </fieldset>
          <div className="bottom-actions-bar">
            <input type="submit" />
            {person && (
              <button
                type="button"
                className="danger"
                onClick={() => remove.mutate(person)}
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
