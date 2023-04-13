import { useQuery } from 'react-query';
import { GraphVisData } from 'react-graph-vis';
import { AxiosCustomError } from '@neo4j-crud/shared';
import * as api from '../../api';
import { AlertCombo, GraphVis } from '../../components';
import { useDebounce } from '../../hooks/useDebounce';

type ContentProps = {
  search: string;
};

export const Content: React.FC<ContentProps> = ({ search }) => {
  const debouncedSearch = useDebounce(search, 500);

  const { data, error, isLoading } = useQuery<GraphVisData, AxiosCustomError>(
    ['visualization', debouncedSearch],
    () => api.visualization.get(search)
  );

  if (error || isLoading || !data) {
    return <AlertCombo error={error} isLoading={isLoading} data={data} />;
  }

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <GraphVis graph={data} />
    </div>
  );
};
