import {User} from '../models/user';
import {Router, Request, Response, NextFunction} from 'express';
import {isLoggedIn} from '../middleware';
import logger from '../utils/logger';

const router = Router();

router.post('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {followingId} = req.body;
    const followings = await req.user.getFollowings();
    const existed = followings.find((e)=>{
        if(e.id===followingId){
            return true;
        }
    })
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
      const existed = await req.user.getFollowings({where: {followingId}});
      if(existed){
          existed[0].destroy();

      }
    } catch(err){
        logger.error(err);
        next(err);
    }
});
export default router;