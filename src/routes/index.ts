import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../common/httpexception';
import httpExcepiton from '../common/httpexception';
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index');
} );
 
export default router;