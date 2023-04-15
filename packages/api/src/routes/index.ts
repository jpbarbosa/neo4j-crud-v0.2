import { Router } from 'express';
import moviesRouter from './movies';
import peopleRouter from './people';
import shortestPathRouter from './shortestPath';
import visualizationRouter from './visualization';

const routers = Router();

routers.use('/movies', moviesRouter);
routers.use('/people', peopleRouter);
routers.use('/shortest-path', shortestPathRouter);
routers.use('/visualization', visualizationRouter);

export default routers;
