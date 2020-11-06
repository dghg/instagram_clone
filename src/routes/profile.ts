import {Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import {User} from '../models/user';
import {isLoggedIn} from '../middleware';
const router = Router();

router.get('/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({where : {id: req.params.id}});
      if(user){
          const isFollowing = await req.user.hasFollowings(req.params.id);
          // check req.user follows profile user
          const followings = await user.countFollowings();
          const followers = await user.countFollowers();
          const posts = await user.getPosts({attributes: ['id', 'content', 'img', 'userId']});
          res.render('profile', {
              posts: JSON.parse(JSON.stringify(posts)),
              followings,
              followers,
              profile: JSON.parse(JSON.stringify(user)),
              isFollowing,
          })
      }
      else{
          next(new Error(`Not Found User ${req.params.id}`));
      }
    } catch(err){
        logger.error(err);
        next(err);
    }
});


export default router;