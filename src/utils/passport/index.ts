import passport, {PassportStatic} from 'passport';
import { nextTick } from 'process';

import {User} from '../../models/user';
import logger from '../logger';
import localStrategy from './localStrategy';

const passportConfig = (passport: PassportStatic) => {
  passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findOne({where : {id}});
      done(null, user);
    } catch(err) {
        logger.error(err);
        done(err);
    }
  });
  
  localStrategy(passport);
};

export default passportConfig;