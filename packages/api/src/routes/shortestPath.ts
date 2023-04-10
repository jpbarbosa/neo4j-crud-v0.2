import { Router } from 'express';
import { shortestPathController } from '../controllers';

const router = Router();

router.get('/', shortestPathController.get);

export default router;
