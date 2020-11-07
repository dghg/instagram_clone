import { Router, Request, Response, NextFunction } from 'express';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Comment} from '../models/comment';
import {Op}  from 'sequelize';
import { Like } from '../models/like';
import { Story } from '../models/story';
import { isLoggedIn } from '../middleware';
import {fn, col} from 'sequelize';
import logger from '../utils/logger';
const router = Router();

const post_include = [
 {
   model: User,
   attributes: {
     include: ['id', 'user_name'],
   }
 },
]

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.isAuthenticated()){
      res.render('login');
    }
    else{
      const followings = (await req.user.getFollowings()).map(user=>user.id);
      const condition = {
        [Op.or]: [
          {userId: followings},
          {userId: req.user.id},
        ]
      };

      const posts = await Post.findAll({
        where: condition,
        attributes: [
            'id', 'content', 'img', 'userId',
            [fn('count', col('likes.PostId')), 'likes_count'],
        ],
        include: [
            {
                model: Like,
                attributes: [],
                as: 'likes',
            },
            {
              model: User,
              attributes: ['id'],
            }
        ],
        group: ['post.id'],
    });
      const stories = await Story.findAll({where: {...condition, createdAt: {[Op.gt]: new Date(Date.now() - (1000*60*60*24)) } }, include: post_include}); // 24hours
      const recommends = await User.findAll({limit: 3}); // TEST
        res.render('main', {
        user: JSON.parse(JSON.stringify(req.user)),
        posts: JSON.parse(JSON.stringify(posts)),
        stories: JSON.parse(JSON.stringify(stories)),
        recommends: JSON.parse(JSON.stringify(recommends)),
      });
      
    }
    
  } catch(err){
    next(err);
  }
});

router.get('/edit', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  res.render('edit');
});

router.put('/edit', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const {user_name, id, introduce, email } = req.body;
  try {
    const updated = await req.user.update({
      user_name,
      id,
      introduce,
      email
    });
    if(updated){
      res.status(200).json({});
    }
    else{
      res.status(400).json({});
    }
  } catch(err){
    logger.error(err);
    next(err);
  }
});
 

export default router;