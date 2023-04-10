import { PathSegment, Session } from 'neo4j-driver';
import { Edge, Node } from 'vis-network/standalone';
import { GraphVisData } from '@neo4j-crud/shared';

type GetShortestPathReturn = GraphVisData;

type GetShortestPathResults = {
  path: {
    segments: PathSegment[];
  };
};

export const shortestPath = (session: Session) => ({
  get: async (
    person1: string,
    person2: string
  ): Promise<GetShortestPathReturn> => {
    const result = await session.run<GetShortestPathResults>(
      `
      WITH
        $person1 AS person1,
        $person2 AS person2
      MATCH path = shortestPath((p1:Person {name: person1})-[*]-(p2:Person {name: person2}))
      RETURN path
      `,
      { person1, person2 }
    );

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const { segments } = result.records[0].get('path');

    segments.forEach((segment, index) => {
      const { start, relationship, end } = segment;

      nodes.push({
        label:
          start.labels[0] === 'Movie'
            ? start.properties.title
            : start.properties.name,
        id: start.identity.toString(),
        group: start.labels[0],
      });

      edges.push({
        label: relationship.type,
        id: relationship.identity.toString(),
        from: relationship.start.toString(),
        to: relationship.end.toString(),
      });

      if (index === segments.length - 1) {
        nodes.push({
          label:
            end.labels[0] === 'Movie'
              ? end.properties.title
              : end.properties.name,
          id: end.identity.toString(),
          group: end.labels[0],
        });
      }
    });

    return {
      nodes,
      edges,
    };
  },
});
