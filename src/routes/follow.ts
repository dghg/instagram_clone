import {User} from '../models/user';
import {Router, Request, Response, NextFunction} from 'express';
import {isLoggedIn} from '../middleware';
import logger from '../utils/logger';

const router = Router();

router.post('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {followingId} = req.body;
    const existed = await req.user.hasFollowings(followingId);

    if(existed){
        res.status(403).json({}); // already existed
    }
    else{
       req.user.addFollowings(followingId)
        .then(()=>{
          res.status(200).send();
        });
    }
  } catch(err){
      logger.error(err);
      next(err);
  }
  
});

router.delete('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {followingId} = req.body;
      const existed = await req.user.hasFollowings(followingId);
      if(existed){
        req.user.removeFollowings(followingId);
        res.status(200).send();
      }
      else {
        res.status(403).json({});
      }
    } catch(err){
        logger.error(err);
        next(err);
    }
});
export default router;