import { hotelController } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const hotelRouter = Router();

hotelRouter.get('/', authenticateToken ,hotelController.getAll);
hotelRouter.get('/:hotelId', authenticateToken ,hotelController.getRooms);


export { hotelRouter };
