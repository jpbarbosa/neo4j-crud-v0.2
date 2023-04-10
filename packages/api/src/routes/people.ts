import { Router } from 'express';
import { peopleController } from '../controllers';

const router = Router();

router.get('/', peopleController.getAll);
router.get('/:id', peopleController.getById);
router.post('/', peopleController.create);
router.put('/:id', peopleController.update);
router.delete('/:id', peopleController.remove);

export default router;
