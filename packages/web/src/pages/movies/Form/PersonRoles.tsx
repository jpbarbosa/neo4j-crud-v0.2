import { Control, Controller, FieldArrayWithId } from 'react-hook-form';
import { Movie } from '@neo4j-crud/shared';
import { InputText } from '../../../components';

type PersonRolesProps = {
  field: FieldArrayWithId<Movie, 'people.actors', 'id'>;
  control: Control<Movie>;
  index: number;
};

export const PersonRoles: React.FC<PersonRolesProps> = ({
  field,
  control,
  index,
}) => {
  return (
    <div className="roles">
      <div className="pr-8 pb-8">as</div>
      {(field.roles || ['']).map((role, roleIndex) => (
        <Controller
          key={`${field.name}-${roleIndex}`}
          name={`people.actors.${index}.roles.${roleIndex}`}
          control={control}
          rules={{ required: true }}
          render={(props) => <InputText {...props} />}
        />
      ))}
    </div>
  );
};
