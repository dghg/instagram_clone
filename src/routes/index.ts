import { Router, Request, Response, NextFunction } from 'express';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Comment} from '../models/comment';
import {Op}  from 'sequelize';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.isAuthenticated()){
      res.render('login');
    }
    else{
      const followings = (await req.user.getFollowings()).map(user=>user.id);
      const posts = await Post.findAll({where : {
        [Op.or]: [{userId: followings}, {userId: req.user.id}]
      }, include: {all: true}, limit: 10});
        res.render('main', {
        user: JSON.parse(JSON.stringify(req.user)),
        posts: JSON.parse(JSON.stringify(posts)),
      });
      
    }
    
  } catch(err){
    next(err);
  }
});
 

export default router;