import {Request, Response, NextFunction} from 'express';
import {Op}  from 'sequelize';
import {Story} from '../models/story';
import {User} from '../models/user';
import logger from '../utils/logger';
export const getStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const isExisted = await Story.findOne({where: {id}});
    if(isExisted) {
      res.render('story', {
        story: JSON.parse(JSON.stringify(isExisted))
      });
    }
    else {
      res.status(404).send();
    }
  } catch(err) {
    logger.error(err);
    next(err);
  }
};

export const uploadStory = async (req: Request, res: Response, next: NextFunction) => {
  const {img} = req.body;
  try {
    const newStory = await req.user.createStory({
      img,
    });
    if(newStory) {
      res.status(200).json(JSON.parse(JSON.stringify(newStory)));
    }
    else {
      res.status(403).json({'message': 'Failed to upload story'});
    }
  } catch(err) {
    logger.error(err);
    next(err);
  }
};

export const getStories = async (req: Request, res: Response, next: NextFunction) => {
    const followings = (await req.user.getFollowings()).map((user)=>user.id);
    const FIND_CONDITION = {
      [Op.or]: [
        {userId: followings},
        {userId: req.user.id},
      ]
    };
    const stories = await Story.findAll({
        where: {...FIND_CONDITION, createdAt: {[Op.gt]: new Date(Date.now() - (1000*60*60*24))}},
        include: [
          {
            model: User,
            attributes: {
                include: ['id'],
            }
          }
        ],
    });

    res.locals.stories = JSON.parse(JSON.stringify(stories));
    next();
};