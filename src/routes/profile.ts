import {Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import {User} from '../models/user';

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({where : {id: req.params.id}});
      if(user){
          const followings = await user.countFollowings();
          const followers = await user.countFollowers();
          const posts = await user.getPosts();
          res.render('profile', {
              posts,
              followings,
              followers,
          })
      };
    } catch(err){
        logger.error(err);
        next(err);
    }
});


export default router;