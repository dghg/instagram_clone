import {Request, Response, NextFunction, query} from 'express';
import {Comment} from '../models/comment';
import { Post } from '../models/post';
import logger from '../utils/logger';
import {Op}  from 'sequelize';
import {fn, col} from 'sequelize';
import { Like } from '../models/like';
import {db} from '../models';
import { debug } from 'console';

export const uploadPost = async (req: Request, res: Response, next: NextFunction) => {
  const { content, img } = req.body;
  try {
    const newPost = await req.user.createPost({
        content,
        img,
    });

    if(newPost) { // Post Created
      res.status(201).json(newPost);
    }
    else {
        res.status(422).send();
    }
  } catch(err) {
    logger.error(err);
    next(err);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.body;
      const deletedPost = await Post.findOne({where: {id}});
      if(deletedPost && deletedPost.userId === req.user.id) {
        deletedPost.destroy()
        .then(()=>{
          res.status(200).json({'message':'success to delete post'});
        });
      }
      else {
        if(!deletedPost) { // Failed to Find Post.
          res.status(404).json({'message': 'failed to find post'});
        }
        else {
          res.status(401).json({'message': 'Unauthorized'});
        }
      }
    } catch(err) {
      logger.error(err);
      next(err);
    }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isExisted = await Post.findOne({where : {id}, include: {model: Comment, as: 'comments', attributes: {exclude: ['createdAt', 'updatedAt']}}});
    if(isExisted) { 
      const isFollowing = req.user && await req.user.hasFollowings(isExisted.userId);
      // Check User follows Post's uploader
      res.render('post', {
        post: JSON.parse(JSON.stringify(isExisted)),
        isFollowing,
      });
    }
    else {
      next(new Error('Not Found Post'));
    }
  } catch(err) {
    logger.error(err);
    next(err);
  }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const followings = (await req.user.getFollowings()).map((user)=>user.id);
  const FIND_CONDITION = {
    [Op.or]: [
      {userId: followings},
      {userId: req.user.id},
    ]
  };
  const posts = await Post.findAll({
    where: FIND_CONDITION,
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
    ],
    group: ['post.id'],
  });
  res.locals.posts = JSON.parse(JSON.stringify(posts));
  next();
};

export const profilePosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /*
    const posts = await Post.findAll({
      where: {userId: req.params.id},
      attributes: [
        'id', 'content', 'img',
        [fn('count', col('likes.id')), 'likes_count'],
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
    */
    const [posts, meta]= await db.query("SELECT `Post`.`id`, `Post`.`content`, `Post`.`img`, count(distinct `likes`.`id`) AS `likes_count`, count(distinct `comments`.`id`) AS `comments_count` FROM `posts` AS `Post` LEFT OUTER JOIN `likes` AS `likes` ON `Post`.`id` = `likes`.`PostId` LEFT OUTER JOIN `comments` AS `comments` ON `Post`.`id` = `comments`.`postId` WHERE `Post`.`userId` = 'test1234' GROUP BY `post`.`id`;");
    console.log(posts);
    res.locals.posts = posts;
    next();
  } catch(err){
    logger.error(err);
    next(err);
  }
};


