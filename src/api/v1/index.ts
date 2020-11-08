import { Router, Request, Response, NextFunction, response } from 'express';
import post from './post';
import like from './like';
import {isLoggedIn} from '../../middleware';
const router = Router();

router.use('/post', isLoggedIn, post);
router.use('/like', isLoggedIn, like);
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({});
});
export default router;