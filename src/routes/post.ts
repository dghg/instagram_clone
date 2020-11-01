import {Request, Response, NextFunction, Router} from 'express';
import * as fs from 'fs';
import * as path from 'path';
import multer from 'multer';
import {isLoggedIn}from '../middleware';
import {User} from '../models/user';
import logger from '../utils/logger';
import { Post } from '../models/post';
import { Like } from '../models/like';
import {Comment} from '../models/comment';

const router = Router();

fs.readdir('uploads', (err) => {
  if(err){
      fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req,file,cb){
      cb(null, 'uploads');
    },
    filename(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname,ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5* 1024 * 1024},
});

router.post('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const {content, img} = req.body;
  try {
    const newPost = await req.user.createPost({
      content,
      img,
    })
    res.status(200).json(newPost);
  } catch(err){
    logger.error(err);
    next(err);
  }
  }
);

router.get('/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existed = await Post.findOne({where : {id: req.params.id}, include: {model: Comment, as: 'comments'}});
    if(existed){
      const isFollowing = await req.user.hasFollowings(existed.userId);
      res.render('post', {
        post: JSON.parse(JSON.stringify(existed)),
        isFollowing,
      });
    }

  } catch(err){
    logger.error(err);
    next(err);
  }
});

router.post('/comment', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const {id, comment} = req.body;
  console.log(id,comment);
  try {
    const newComment = await req.user.createComment({
      content: comment,
      postId: id,
    });
    if(newComment){
      res.status(201).json(newComment);
    }
    else{
      res.status(403).json({});
    }
  } catch(err){
    logger.error(err);
    next(err);
  }
});

router.post('/:id/like', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {

    req.user.addLikes(id)
    .then(()=>(
      res.status(200).redirect('/p/'+id)
    ));
    


  } catch(err){
    console.log(err);
    // logger.error(err);
    next(err);
  }
});

router.delete('/:id/like',  isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
  } catch(err){
    logger.error(err);
    next(err);
  }
});

router.delete('/comment', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.body;
    const deleted = await Comment.findOne({where: {id}}); 
    if(deleted){
      deleted.destroy()
      .then(()=>{
        res.status(200).json({});
      });
    } 
    else {
      res.status(403).json({});
    }
  } catch(err) {
    logger.error(err);
    next(err);
  }
});

router.post('/img', isLoggedIn, upload.single('img'), (req: Request, res: Response, next: NextFunction) => {
  console.log('img upload success');
  res.json({url: req.file.filename});
});

export default router;
