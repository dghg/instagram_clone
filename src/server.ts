import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import app from './index';
import logger from './utils/logger';
import {db} from './models/index';
import {errorHandler} from './utils/errorhandler';
require('dotenv').config();

//DB sync
db.sync();

app.use((req: Request, res: Response, next: NextFunction) => {
  var err = new Error('Not Found.');
  res.status(404);
  next(err);
});

app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  logger.info(`listening on PORT ${process.env.PORT}`);
});

export default server;