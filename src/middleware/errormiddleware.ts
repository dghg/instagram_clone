import HttpException from '../common/httpexception';
import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express';

const errorHandler= (error: any, req: Request, res: Response, next: NextFunction) => {
  if(!error){
    error = new HttpException(404, 'Not found');
  }
  console.log('err router');
  logger.error(error.message);
  res.locals.error = error; 
  if(!(error instanceof HttpException)){
    res.status(500);
  }
  else{
    res.status(error.status);
  }
  res.render('error');
};

export default errorHandler;