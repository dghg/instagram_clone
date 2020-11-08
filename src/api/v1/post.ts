import { Router, Request, Response, NextFunction, response } from 'express';
import { json } from 'sequelize';
import { Like } from '../../models/like';
import {Post} from '../../models/post';

const router = Router();


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const posts = await Post.findAll({limit: 10});
  res.status(200).json(JSON.parse(JSON.stringify(posts)));
});
export default router;
