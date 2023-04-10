import { Movie, Person, Relationship } from '@neo4j-crud/shared';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

type SelectPersonProps = {
  data: Person[];
  register: UseFormRegister<Movie>;
  index: number;
  relationship: Relationship;
};

export const SelectPerson: React.FC<SelectPersonProps> = ({
  data,
  register,
  index,
  relationship,
}) => {
  const [addNewPerson, setAddNewPerson] = useState(false);

  const { onChange, ...rest } = register(
    `people.${relationship.collection}.${index}.name`
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.value === 'add-new-person') {
      e.target.value = '';
      setAddNewPerson(true);
    }
    onChange(e);
  };

  return (
    <span>
      {addNewPerson ? (
        <input
          type="text"
          placeholder="Name"
          {...rest}
          onChange={handleChange}
        />
      ) : (
        <select {...rest} onChange={handleChange}>
          <option value="">Select a Person</option>
          <option value="add-new-person">Add new person...</option>
          {data.map((person) => (
            <option key={person.name} value={person.name}>
              {person.name}
            </option>
          ))}
        </select>
      )}
    </span>
  );
};
