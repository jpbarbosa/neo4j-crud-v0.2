import * as graph from '@neo4j-crud/graph';
import { AppResponse, Movie } from '@neo4j-crud/shared';
import { NextFunction } from 'express';

export const moviesController = {
  getAll: async (req, res: AppResponse<Movie[]>, next: NextFunction) => {
    try {
      const search = req.query.search as string;
      const movies = await graph.movies(req.neo4jSession).getAll(search);
      res.send(movies);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res: AppResponse<Movie>, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const movie = await graph.movies(req.neo4jSession).getById(id);
      res.send(movie);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res: AppResponse<Movie>, next: NextFunction) => {
    try {
      const movie = await graph.movies(req.neo4jSession).create(req.body);
      res.send(movie);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res: AppResponse<Movie>, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const movie = await graph.movies(req.neo4jSession).update(id, req.body);
      res.send(movie);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res: AppResponse<Movie>, next: NextFunction) => {
    const id = parseInt(req.params.id);
    try {
      const movie = await graph.movies(req.neo4jSession).remove(id);
      res.send(movie);
    } catch (err) {
      next(err);
    }
  },
};
