import { AxiosCustomError } from '@neo4j-crud/shared';
import { ErrorAlert, LoadingAlert } from './';

type AlertComboProps = {
  error: AxiosCustomError | null;
  isLoading: boolean;
  noData: any;
};

export const AlertCombo: React.FC<AlertComboProps> = ({
  error,
  isLoading,
  noData,
}) => {
  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (isLoading) {
    return <LoadingAlert />;
  }

  if (noData) {
    return <div className="alert warn">No Data</div>;
  }

  return null;
};
