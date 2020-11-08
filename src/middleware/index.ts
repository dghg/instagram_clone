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
      res.locals.user = req.user; // add user if authenticated
      next();
    }
    else{
        res.render('login');
    }
  };