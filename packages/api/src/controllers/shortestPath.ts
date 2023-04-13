import { NextFunction } from 'express';
import { AppResponse, GraphVisData } from '@neo4j-crud/shared';
import * as graph from '@neo4j-crud/graph';

export const shortestPathController = {
  get: async (req, res: AppResponse<GraphVisData>, next: NextFunction) => {
    try {
      const person1 = req.query.person1 as string;
      const person2 = req.query.person2 as string;
      const result = await graph
        .shortestPath(req.neo4jSession)
        .get(person1, person2);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },
};
