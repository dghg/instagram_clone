import { Strategy } from 'passport-local';
import {PassportStatic} from 'passport';
import * as bcrypt from 'bcrypt';
import {User} from '../../models/user';
import logger from '../logger';

const notExistId = { message : '입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.'};
const PasswordFailure = { message : '잘못된 비밀번호입니다. 다시 확인하세요.'};

const localStrategy = (passport: PassportStatic) => { // authenticate strategy 
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
            done(null, false, PasswordFailure);
        }
      }
      else {
        done(null, false, notExistId);
      }
    } catch(err){
        logger.error(err);
        done(err);
    }
  }));
};

export default localStrategy;