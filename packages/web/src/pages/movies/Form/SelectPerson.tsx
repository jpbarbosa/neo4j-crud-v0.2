import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Movie, Person, Relationship } from '@neo4j-crud/shared';
import { FormFieldError } from '../../../components';

type SelectPersonProps = {
  data: Person[];
  control: Control<Movie>;
  index: number;
  relationship: Relationship;
};

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export const SelectPerson: React.FC<SelectPersonProps> = ({
  data,
  control,
  index,
  relationship,
}) => {
  const [addNewPerson, setAddNewPerson] = useState(false);

  const handleChange = (e: ChangeEvent, onChange: (e: ChangeEvent) => void) => {
    if (e.target.value === 'add-new-person') {
      e.target.value = '';
      setAddNewPerson(true);
    }
    onChange(e);
  };

  return (
    <Controller
      name={`people.${relationship.collection}.${index}.name`}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState }) => (
        <span>
          {addNewPerson ? (
            <input type="text" placeholder="Name" {...field} />
          ) : (
            <select
              {...field}
              onChange={(e) => {
                handleChange(e, field.onChange);
              }}
            >
              <option value="">Select a Person</option>
              <option value="add-new-person">Add new person...</option>
              {data.map((person) => (
                <option key={person.name} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          )}
          <FormFieldError error={fieldState.error} />
        </span>
      )}
    />
  );
};
