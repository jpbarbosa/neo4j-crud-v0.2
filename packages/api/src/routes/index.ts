import { Router } from 'express';
import moviesRouter from './movies';
import peopleRouter from './people';
import visualizationRouter from './visualization';
import shortestPathRouter from './shortestPath';

const routers = Router();

routers.use('/movies', moviesRouter);
routers.use('/people', peopleRouter);
routers.use('/visualization', visualizationRouter);
routers.use('/shortest-path', shortestPathRouter);

export default routers;
