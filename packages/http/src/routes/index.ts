import { Router } from 'express';
import moviesRouter from './movies';

const routers = Router();

routers.use('/movies', moviesRouter);

export default routers;
