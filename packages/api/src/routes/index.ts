import { Router } from 'express';
import moviesRouter from './movies';
import peopleRouter from './people';

const routers = Router();

routers.use('/movies', moviesRouter);
routers.use('/people', peopleRouter);

export default routers;
