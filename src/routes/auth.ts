import { Router, Request, Response, NextFunction, response } from 'express';
import passport from 'passport';
import * as bcrypt from 'bcrypt';
import logger from '../utils/logger';

import {User} from '../models/user';
import {isLoggedIn} from '../middleware';
const router = Router();

router.get('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('signup');
  } catch(err) {
      logger.error(err);
      next(err);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            logger.error(err);
            return next(err);
        }
        if(!user){
            req.flash('loginError', info.message);
            return res.redirect('/');
        }

        return req.login(user, (err) => {
          if(err){
              logger.error(err);
              return next(err);
          }
          return res.redirect('/');
        })
    })(req,res,next);

  } catch(err) {
      logger.error(err);
      next(err);
  }
});

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {email, user_name, id, password } = req.body;
      const existed = await User.findOne({where: {id}});
      if(existed) {
          req.flash('joinError', '이미 가입된 아이디입니다.');
          return res.redirect('/singup'); // 수정 필요
      }
      else {
          const password_crypt = await bcrypt.hash(password, 5);
          await User.create({
             id,
             password: password_crypt,
             email,
             user_name, 
          });

          return res.redirect('/');
      }
    } catch(err) {
        logger.error(err);
        next(err);
    }
  
});

router.get('/logout', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout();
      res.redirect('/');
    } catch(err) {
        logger.error(err);
        next(err);
    }
  
});

router.get('/facebook');
router.get('/facebook/callback');

export default router;