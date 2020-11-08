import { Router, Request, Response, NextFunction, response } from 'express';
import {Post} from '../../models/post';
import {Like} from '../../models/like';
import {isLoggedIn} from '../../middleware';
import logger from '../../utils/logger';
const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const existed = await Like.findOne({where : {UserId: req.user.id, PostId: id}});
    if(existed){
      res.status(200).send();
    }
    else{
      res.status(404).send();
    }
  } catch(err) {
      logger.error(err);
      next(err);
  }
  const id = req.params.id;  
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.body;
  const like = await Like.findOrCreate({where: {UserId: req.user.id, PostId: id}});
  if(like) {
    res.status(200).send();
  }
  else {
    res.status(404).send();
  }
});

router.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.body;
  const like = await Like.findOne({where: {UserId: req.user.id, PostId: id}});
  if(like){
    like.destroy()
    .then(()=>{
      res.status(200).send();
    })
  }
  else{
    res.status(404).send();
  }
});

export default router;