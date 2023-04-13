import { useQuery } from 'react-query';
import {
  Control,
  FieldArrayWithId,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import {
  Movie,
  Person,
  Relationship,
  stringToTitleCase,
} from '@neo4j-crud/shared';
import * as api from '../../../api';
import { LoadingAlert } from '../../../components';
import { SelectPerson } from './SelectPerson';
import { PersonRoles } from './PersonRoles';

type PeopleProps = {
  control: Control<Movie>;
  register: UseFormRegister<Movie>;
  relationship: Relationship;
};

export const People: React.FC<PeopleProps> = ({
  control,
  register,
  relationship,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `people.${relationship.collection}`,
  });

  const { data, isLoading } = useQuery<Person[]>([], () => api.people.getAll());

  if (isLoading) {
    return <LoadingAlert />;
  }

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.name}>
          {data && (
            <SelectPerson
              data={data}
              index={index}
              register={register}
              relationship={relationship}
            />
          )}
          {relationship.collection === 'actors' && (
            <PersonRoles
              register={register}
              field={field as FieldArrayWithId<Movie, 'people.actors', 'id'>}
              index={index}
            />
          )}
          <button
            type="button"
            className="danger"
            onClick={() => remove(index)}
          >
            X
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '' })}>
        Add {stringToTitleCase(relationship.key)}
      </button>
    </>
  );
};
