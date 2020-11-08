import {Request, Response, NextFunction} from 'express';
import {Comment} from '../models/comment';
import { Post } from '../models/post';
import logger from '../utils/logger';
import passport from 'passport';
import { User } from '../models/user';
import * as bcrypt from 'bcrypt';


export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if(err) throw err;
      if(!user) {
          req.flash('loginError', info.message);
          res.status(401).send();
      }
      return req.login(user, (err) => {
          if(err) throw err;
          res.status(200).redirect('/');
      });
    })(req,res,next);
  } catch(err) {
      logger.error(err);
      next(err);
  }
};

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  const {email, user_name, id, password } = req.body;
  try {
    const isExisted = await User.findOne({where: {id}});
    if(isExisted) {
        req.flash('joinError', '이미 가입된 아이디입니다.');
        res.status(403).send();
    }
    else {
        const password_crypt = await bcrypt.hash(password, 5);
        const created = await User.create({
            id,
            password: password_crypt,
            email,
            user_name,
        });
        if(created) {
            res.status(200).redirect('/');
        }
        else {
            res.status(403).send();
        }
    }
  } catch(err) {
      logger.error(err);
      next(err);
  }
};

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.logout();
      res.redirect('/');
    } catch(err) {
        logger.error(err);
        next(err);
    }
}


export const userProfileEdit = async (req: Request, res: Response, next: NextFunction) => {
  const {user_name, id, introduce, email } = req.body;
  try {
    const updated = await req.user.update({
        user_name,
        id,
        introduce,
        email,
    });
    if(updated) {
        res.status(200).json({'message': 'success to edit profile'});
    }
    else {
        res.status(403).json({'message': 'failed to edit profile'});
    }
  } catch(err) {
      logger.error(err);
      next(err);
  }
};

export const getUserRecommends = async (req: Request, res: Response, next: NextFunction) => {
  const recommend = await User.findAll({limit: 3});
  res.locals.recommends = JSON.parse(JSON.stringify(recommend));
  next();
}; // NOT IMPLEMENT

export const addFollow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {followingId} = req.body;
    const isExisted = await req.user.hasFollowings(followingId);
    
    if(isExisted) {
        res.status(403).json({'message': 'Already Following'});
    }
    else {
      req.user.addFollowings(followingId)
      .then(()=>{
          res.status(200).send();
      })
    }
  } catch(err) {
      logger.error(err);
      next(err);
  }
};

export const deFollow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {followingId} = req.body;
    const isExisted = await req.user.hasFollowings(followingId);
    
    if(isExisted) {
      req.user.removeFollowings(followingId);
      res.status(200).send();
    }
    else {
        res.status(403).json({'message': 'Not yet Following'});
    }
  } catch(err){
      logger.error(err);
      next(err);
  }
};

export const profileUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({where: {id: req.params.id}});
    if(user) {
      const isFollowing = req.user && await req.user.hasFollowings(req.params.id);
      const followings = await user.countFollowings();
      const followers = await user.countFollowers();
      
      res.locals.isFollowing = isFollowing;
      res.locals.followings = followings;
      res.locals.followers = followers;
      res.locals.profile = JSON.parse(JSON.stringify(user));
      next();
    }
    else {
      throw new Error('Not Found User ' + req.params.id);
    }
  } catch(err) {
    logger.error(err);
    next(err);
  }
};