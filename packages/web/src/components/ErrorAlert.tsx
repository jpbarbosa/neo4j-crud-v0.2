import { AxiosCustomError } from '@neo4j-crud/shared';

type ErrorAlertProps = {
  error: AxiosCustomError;
};

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  return (
    <div className="alert danger">
      <div>{error.message}</div>
      <div>{error.response?.data.error}</div>
    </div>
  );
};
