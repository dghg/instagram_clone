import {Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import {User} from '../models/user';
import {isLoggedIn} from '../middleware';
const router = Router();

router.get('/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
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
              profile: user,
          })
      };
    } catch(err){
        logger.error(err);
        next(err);
    }
});


export default router;