import bodyParser from 'body-parser';
import express, { NextFunction, ErrorRequestHandler } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import passport from 'passport';
import passportConfig from './utils/passport';
const flash = require('connect-flash');
import router from './routes';
import cors from 'cors';
import api from './api/v1';

import redis from 'redis';
import connect_redis from 'connect-redis';

class App {
    app: express.Application;

    constructor() {
        require('dotenv').config();
        this.app = express();
        this.session();
        this.middleware();
        this.render();
        this.parser();
        this.passportconfig();
        this.routes();
    }

    private session(): void {
      const redisStore = connect_redis(session);
      const client = redis.createClient({
        host: process.env.REDIS_HOST as string,
        port: parseInt(process.env.REDIS_PORT as string),
        password: process.env.REDIS_PASSWORD as string,
      });
      this.app.use(session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET as string,
        cookie: {
          httpOnly: true,
          secure: false,
        },
        store: new redisStore({
          client,
          logErrors: true,
        }),
      }));
    }

    private middleware(): void {
  //  this.app.use(helmet());
      this.app.use(flash());
      this.app.use(cors({origin: '*'}));
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
      this.app.use(cookieParser(process.env.COOKIE_SECRET as string));
    }

    private passportconfig(): void {
      passportConfig(passport);
      this.app.use(passport.initialize());
      this.app.use(passport.session());
    }

    private routes(): void {
      this.app.use('/', router);
      this.app.use('/api/v1', api);
    }
}

export default new App().app;