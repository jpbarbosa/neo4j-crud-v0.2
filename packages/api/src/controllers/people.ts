import { NextFunction } from 'express';
import { AppResponse, Person } from '@neo4j-crud/shared';
import * as graph from '@neo4j-crud/graph';

export const peopleController = {
  getAll: async (req, res: AppResponse<Person[]>, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const people = await graph.people(req.neo4jSession).getAll(search);
      res.send(people);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res: AppResponse<Person>, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const person = await graph.people(req.neo4jSession).getById(id);
      if (!person) {
        res.status(404).send({ error: 'Not Found' });
      }
      res.send(person);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res: AppResponse<Person>, next: NextFunction) => {
    try {
      const person = await graph.people(req.neo4jSession).create(req.body);
      res.send(person);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res: AppResponse<Person>, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const person = await graph.people(req.neo4jSession).update(id, req.body);
      res.send(person);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res: AppResponse<Person>, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const person = await graph.people(req.neo4jSession).remove(id);
      res.send(person);
    } catch (err) {
      next(err);
    }
  },
};
