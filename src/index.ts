import bodyParser from 'body-parser';
import express, { NextFunction, ErrorRequestHandler } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import errorHandler from './middleware/errormiddleware';
const flash = require('connect-flash');

//Router import
import router from './routes/index';


class App {
    app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.render();
        this.parser();
        this.routes();
    }

    private middleware(): void {
  //  this.app.use(helmet());
      if(process.env.NODE_ENV==='development'){
        this.app.use(session({
          resave: false,
          saveUninitialized: false,
          secret: process.env.COOKIE_SECRET as string,
          cookie: {
            httpOnly: true,
            secure: false,
          },
        }));
      }
    }

    private render(): void {
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.set('view engine', 'pug');
      this.app.use(express.static(path.join(__dirname, 'public')));
    }

    private parser(): void {
      this.app.use(bodyParser.json()); 
      this.app.use(bodyParser.urlencoded({extended:false}));
      this.app.use(cookieParser(process.env.COOKIE_SECRET));
      this.app.use(flash());
    }

    private passportconfig(): void {

    }

    private routes(): void {
      this.app.use('/', router);
    }


}

export default new App().app;