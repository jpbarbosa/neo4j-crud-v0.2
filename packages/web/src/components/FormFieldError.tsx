import { FieldError } from 'react-hook-form';

type FormFieldsErrorProps = {
  error?: FieldError;
};

export const FormFieldError: React.FC<FormFieldsErrorProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="form-field-error">
      <div>{error.type}</div>
      <div>{error.message}</div>
    </div>
  );
};
