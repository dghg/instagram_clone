import {Request, Response, NextFunction } from 'express';


export const isNotLoggedIn= (req: Request, res: Response, next: NextFunction) => {
  if(!req.isAuthenticated()){
    next();
  }
  else{
      res.redirect('/');
  }
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){
      next();
    }
    else{
        res.redirect('/');
    }
  };