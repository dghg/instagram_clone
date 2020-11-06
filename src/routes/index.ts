import { Router, Request, Response, NextFunction } from 'express';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Comment} from '../models/comment';
import {Op}  from 'sequelize';
import { Like } from '../models/like';
import { Story } from '../models/story';
import { isLoggedIn } from '../middleware';

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

      const posts = await Post.findAll({where : condition, attributes:{exclude: ['createdAt, updatedAt']} ,include: post_include, limit: 10});
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
 

export default router;