import { Router } from 'express';
import moviesRouter from './movies';
import peopleRouter from './people';
import visualizationRouter from './visualization';

const routers = Router();

routers.use('/movies', moviesRouter);
routers.use('/people', peopleRouter);
routers.use('/visualization', visualizationRouter);

export default routers;
