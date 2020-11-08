import logger from './logger';
import {Request, Response, NextFunction} from 'express';

export const errorHandler = (err: Error,req : Request,res : Response,next : NextFunction) => {
    logger.error(err.message);
    res.locals.error = err;
    res.render('error');
};
  