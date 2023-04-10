import { AxiosCustomError } from '@neo4j-crud/shared';
import { ErrorAlert, LoadingAlert } from './';

type AlertComboProps = {
  error: AxiosCustomError | null;
  isLoading?: boolean;
  data?: any;
};

export const AlertCombo: React.FC<AlertComboProps> = ({
  error,
  isLoading,
  data,
}) => {
  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (isLoading) {
    return <LoadingAlert />;
  }

  if (!data) {
    return <div className="alert warn">Not Found</div>;
  }

  return null;
};
