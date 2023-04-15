import { Relationship, Session } from 'neo4j-driver';
import { Node, Edge } from 'vis-network/standalone';
import { GraphVisData, MovieNode, PersonNode } from '@neo4j-crud/shared';
import * as queries from './queries';

type GetGraphReturn = GraphVisData;

type GetGraphResults = {
  person: PersonNode;
  movie: MovieNode;
  r: Relationship;
};

export const visualization = (session: Session) => ({
  get: async (search = ''): Promise<GetGraphReturn> => {
    const result = await session.run<GetGraphResults>(queries.get, { search });

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    result.records.forEach((record) => {
      const movie = record.get('movie');
      const person = record.get('person');
      const edge = record.get('r');

      if (!nodes.find((node) => node.id === movie.identity.toString())) {
        nodes.push({
          label: movie.properties.title,
          id: movie.identity.toString(),
          group: 'Movie',
        });
      }

      if (!nodes.find((node) => node.id === person.identity.toString())) {
        nodes.push({
          label: person.properties.name,
          id: person.identity.toString(),
          group: 'Person',
        });
      }

      if (edge) {
        edges.push({
          label: edge.type,
          id: edge.identity.toString(),
          from: edge.start.toString(),
          to: edge.end.toString(),
        });
      }
    });

    return {
      nodes,
      edges,
    };
  },
});
