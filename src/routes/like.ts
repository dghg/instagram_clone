import {Router, Request, Response, NextFunction} from 'express';
import {isLoggedIn} from '../middleware';
import {Post} from '../models/post';
import {Like} from '../models/like';
import logger from '../utils/logger';
const router = Router();

router.post('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
     const {id} = req.body;
     const existed = await Like.findOne({where : {UserId: req.user.id, PostId: id}});
    if(existed){
      res.status(403).json({});
    }
    else{
      const like = await Like.create({UserId: req.user.id, PostId:id});
      if(like){
        res.status(200).json({});
      }
    }
  } catch(err) {
      logger.error(err);
      next(err);
  }
});

router.get('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const post = await Post.findOne({});
  post && post.addLikes('3');
 });


export default router;