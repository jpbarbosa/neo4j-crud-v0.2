import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';
import { FormFieldError } from './FormFieldError';

type InputTextProps = {
  field: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
  className?: string;
};

export const InputText: React.FC<InputTextProps> = ({
  field,
  fieldState,
  className,
}) => {
  return (
    <div>
      <input type="text" {...field} className={className || ''} />
      <FormFieldError error={fieldState.error} />
    </div>
  );
};
