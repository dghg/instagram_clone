import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import app from './index';
import logger from './utils/logger';
import {db} from './models/index';

require('dotenv').config();

const errorhandling = (err: Error,req : Request,res : Response,next : NextFunction) => {
  logger.error(err.message);
  res.locals.error = err;
  res.render('error');
}
//DB sync
db.sync();

app.use(errorhandling);

const server = app.listen(process.env.PORT, () => {
  logger.info(`listening on PORT ${process.env.PORT}`);
});

export default server;