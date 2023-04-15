import { useQuery } from 'react-query';
import { GraphVisData } from 'react-graph-vis';
import { AxiosCustomError } from '@neo4j-crud/shared';
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

  const noData = !data || data.nodes.length === 0;

  if (error || isLoading || noData) {
    return <AlertCombo error={error} isLoading={isLoading} noData={noData} />;
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
