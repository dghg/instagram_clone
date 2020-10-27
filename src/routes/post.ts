import {Request, Response, NextFunction, Router} from 'express';
import * as fs from 'fs';
import * as path from 'path';
import multer from 'multer';
import {isLoggedIn}from '../middleware';
import {User} from '../models/user';
import logger from '../utils/logger';
import { Post } from '../models/post';

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

router.get('/', isLoggedIn, (req: Request, res: Response, next: NextFunction) => {
  res.render('upload');
}); // upload \page 

router.get('/:id', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existed = await Post.findOne({where : {id: req.params.id}});
    res.render('post', {
      post: existed,
    });
  } catch(err){
    logger.error(err);
    next(err);
  }
});
router.post('/', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const {content, img} = req.body;
  try {
    const newPost = await req.user.createPost({
      content,
      img,
    })
    res.status(200).json({});
  } catch(err){
    logger.error(err);
    next(err);
  }
  }
);

router.post('/:id/comment', isLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const {comment} = req.body;
  const id = req.params.id;
  try {
    const newComment = await req.user.createComment({
      content: comment,
      postId: id,
    });
    res.status(200).json({});
  } catch(err){
    logger.error(err);
    next(err);
  }
});

router.post('/img', isLoggedIn, upload.single('img'), (req: Request, res: Response, next: NextFunction) => {
  res.json({url: req.file.filename});
});

export default router;
