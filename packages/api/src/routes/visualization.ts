import { Router } from 'express';
import { visualizationController } from '../controllers';

const router = Router();

router.get('/', visualizationController.get);

export default router;
