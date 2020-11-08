import {Request, Response, NextFunction} from 'express';
import logger from '../utils/logger';
import {Comment} from '../models/comment';

export const uploadComment = async (req: Request, res: Response, next: NextFunction) => {
  const {id, comment} = req.body;
  try {
      const newComment = await req.user.createComment({
          content: comment,
          postId: id,
      });
      if(newComment) {
          res.status(201).json(JSON.parse(JSON.stringify(newComment)));
      }
      else {
          res.status(403).json({'message': 'failed to upload comment'});
      }
  } catch(err){
      logger.error(err);
      next(err);
  } 
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.body;
    const deleted = await Comment.findOne({where: {id}});
    if(deleted && deleted.userId === req.user.id) {
        deleted.destroy()
        .then(()=>{
            res.status(200).json({'message': 'delete comment'});
        })
    }
    else {
        res.status(403).json({'message': 'failed to delete comment'});
    }
  } catch(err){
      logger.error(err);
      next(err);
  }
};