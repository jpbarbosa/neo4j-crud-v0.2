import { Person } from '@neo4j-crud/shared';

type SelectPersonProps = {
  value: string;
  otherValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data: Person[] | undefined;
};

export const SelectPerson: React.FC<SelectPersonProps> = ({
  value,
  otherValue,
  onChange,
  data,
}) => {
  return (
    <span>
      <select value={value} onChange={onChange}>
        {data?.map((person) => (
          <option
            key={person.name}
            value={person.name}
            disabled={person.name === otherValue}
          >
            {person.name}
          </option>
        ))}
      </select>
    </span>
  );
};
