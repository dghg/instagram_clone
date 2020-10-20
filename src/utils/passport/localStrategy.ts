import { Strategy } from 'passport-local';
import {PassportStatic} from 'passport';
import * as bcrypt from 'bcrypt';
import {User} from '../../models/user';
import logger from '../logger';

const message = { message : '아이디 또는 비밀번호 틀림'};

const localStrategy = (passport: PassportStatic) => {
  passport.use(new Strategy({usernameField: 'id'}, async (id, password, done) => {
    try {
      const existed = await User.findOne({where: {id}});
      console.log(existed);
      if(existed){
        const compare_pw = await bcrypt.compare(password, existed.password);
        if(compare_pw){
          done(null, existed);
        }
        else{
            done(null, false, message);
        }
      }
      else {
        done(null, false, message);
      }
    } catch(err){
        logger.error(err);
        done(err);
    }
  }));
};

export default localStrategy;