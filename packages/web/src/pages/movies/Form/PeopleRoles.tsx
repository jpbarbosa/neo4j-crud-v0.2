import { Movie } from '@neo4j-crud/shared';
import { FieldArrayWithId, UseFormRegister } from 'react-hook-form';

type FormPeopleRolesProps = {
  field: FieldArrayWithId<Movie, 'people.actors', 'id'>;
  register: UseFormRegister<Movie>;
  index: number;
};

export const FormPeopleRoles: React.FC<FormPeopleRolesProps> = ({
  field,
  register,
  index,
}) => {
  return (
    <span>
      {(field.roles || ['']).map((role, roleIndex) => (
        <span key={`${field.name}-${roleIndex}`}>
          <span className="pr-8">as</span>
          <input
            type="text"
            {...register(`people.actors.${index}.roles.${roleIndex}`, {
              required: true,
            })}
          />
        </span>
      ))}{' '}
    </span>
  );
};
