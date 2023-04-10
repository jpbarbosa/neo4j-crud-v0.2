import * as graph from '@neo4j-crud/graph';
import { AppResponse, GraphVisData } from '@neo4j-crud/shared';
import { NextFunction } from 'express';

export const visualizationController = {
  get: async (req, res: AppResponse<GraphVisData>, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const result = await graph.visualization(req.neo4jSession).get(search);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },
};
