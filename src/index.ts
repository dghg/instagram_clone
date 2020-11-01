import bodyParser from 'body-parser';
import express, { NextFunction, ErrorRequestHandler } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import passport from 'passport';
import passportConfig from './utils/passport';
const flash = require('connect-flash');
//Router import
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import postRouter from './routes/post';
import profileRouter from './routes/profile';
import storyRouter from './routes/story';
import followRouter from './routes/follow';
import cors from 'cors';
import { TableHints } from 'sequelize/types';

class App {
    app: express.Application;

    constructor() {
        require('dotenv').config();
        this.app = express();
        this.middleware();
        this.render();
        this.parser();
        this.passportconfig();
        this.routes();
    }

    private middleware(): void {
  //  this.app.use(helmet());
       this.app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET as string,
        cookie: {
          httpOnly: true,
          secure: false,
        },
      }));
      this.app.use(flash());
    //  this.app.use(cors({origin: '*'}));
      this.app.locals.baseurl = process.env.BASEURL;
    }

    private render(): void {
      this.app.set('views', path.join(__dirname, 'views'));
      this.app.set('view engine', 'pug');
      this.app.use(express.static(path.join(__dirname, 'public')));
      this.app.use(express.static(path.join(__dirname, '../uploads')));
    }

    private parser(): void {
      this.app.use(bodyParser.json()); 
      this.app.use(bodyParser.urlencoded({extended:false}));
      this.app.use(cookieParser(process.env.COOKIE_SECRET));
    }

    private passportconfig(): void {
      passportConfig(passport);
      this.app.use(passport.initialize());
      this.app.use(passport.session());
    }

    private routes(): void {
      this.app.use('/', indexRouter);
      this.app.use('/auth', authRouter);
      this.app.use('/p', postRouter);
      this.app.use('/profile', profileRouter);
      this.app.use('/story', storyRouter);
      this.app.use('/follow', followRouter);
    }


}

export default new App().app;