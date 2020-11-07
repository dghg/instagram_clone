import {Router, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import {User} from '../models/user';
import {Comment} from '../models/comment';
import {isLoggedIn} from '../middleware';
import { Like } from '../models/like';
import {Post} from '../models/post';
import {fn, col} from 'sequelize';
const router = Router();


router.get('/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({where : {id: req.params.id}});
      if(user){
          const isFollowing = await req.user.hasFollowings(req.params.id);
          // check req.user follows profile user
          const followings = await user.countFollowings();
          const followers = await user.countFollowers();
          const posts = await Post.findAll({
              where: {userId: req.params.id},
              attributes: [
                  'id', 'content', 'img',
                  [fn('count', col('likes.PostId')), 'likes_count'],
                  [fn('count', col('comments.id')), 'comments_count'],
              ],
              include: [
                  {
                      model: Like,
                      attributes: [],
                      as: 'likes',
                  },
                  {
                      model: Comment,
                      attributes: [],
                      as: 'comments',
                  }
              ],
              group: ['post.id'],
          });
        console.log(posts);
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