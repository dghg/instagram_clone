import { Router, Request, Response, NextFunction } from 'express';
import {User} from '../models';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  await User.create({
    id: 'test1',
    password: 'test1',
    user_name: 'test1',
    email: 'dongh@naver.com',
    social: 'local',
  })
  res.render('index');
} );
 
export default router;