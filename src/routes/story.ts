import {Request, Response, NextFunction, Router} from 'express';
import {isLoggedIn}from '../middleware';
import {User} from '../models/user';
import {Story} from '../models/story';
import logger from '../utils/logger';
import multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { networkInterfaces } from 'os';


const router = Router();

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
  const {img} = req.body;
  try {
    const newStory = await req.user.createStory({
        img,
    });
    if(newStory){
      res.status(200).json(newStory);
    }
    else {
      res.status(403).json({});
    }
  } catch(err){
    logger.error(err);
    next(err);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = req.params.id;
    const existed = await Story.findOne({where: {id}});
    if(existed){
        res.render('story', {
          story: JSON.parse(JSON.stringify(existed)),
        }
        )
    }
  } catch(err) {
      logger.error(err);
      next(err);
  }
});

export default router;