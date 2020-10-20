import { Router, Request, Response, NextFunction } from 'express';

import {User} from '../models/user';
import {Post} from '../models/post';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('login');

  } catch(err){
    next(err);
  }
});
 
router.get('/getpost', async (req: Request, res: Response, next: NextFunction) => {

});
export default router;