import { Router } from 'express';
import { moviesController } from '../controllers/movies';

const router = Router();

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getById);
router.post('/', moviesController.create);
router.put('/:id', moviesController.update);
router.delete('/:id', moviesController.remove);

export default router;
