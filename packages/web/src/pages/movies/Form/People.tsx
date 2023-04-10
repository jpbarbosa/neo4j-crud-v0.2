import { Movie, Relationship, stringToTitleCase } from '@neo4j-crud/shared';
import { SelectPerson } from './SelectPerson';
import { Person } from '@neo4j-crud/shared';
import { useQuery } from 'react-query';
import {
  Control,
  FieldArrayWithId,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { FormPeopleRoles } from './PeopleRoles';
import { LoadingAlert } from '../../../components';
import { api } from '../../../api';

type FormPeopleProps = {
  control: Control<Movie>;
  register: UseFormRegister<Movie>;
  relationship: Relationship;
};

export const FormPeople: React.FC<FormPeopleProps> = ({
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
            <FormPeopleRoles
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
