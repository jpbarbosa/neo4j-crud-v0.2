import { AxiosCustomError } from '@neo4j-crud/shared';
import { GraphVisData } from 'react-graph-vis';
import { useQuery } from 'react-query';
import * as api from '../../api';
import { AlertCombo, GraphVis } from '../../components';

type ContentProps = {
  person1: string;
  person2: string;
};

export const Content: React.FC<ContentProps> = ({ person1, person2 }) => {
  const { data, error, isLoading } = useQuery<GraphVisData, AxiosCustomError>(
    ['shortest-path', person1, person2],
    () => api.shortestPath.get(person1, person2)
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
