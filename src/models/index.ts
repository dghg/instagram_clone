import { Sequelize } from 'sequelize';
import config from '../config/config';

//DB
import {User} from './user';
import {Post} from './post';
import {Comment} from './comment';
import {Like} from './like';
import {Story} from './story';
const dbconfig = process.env.NODE_ENV === 'development' ? config.development : config.production;
export const db = new Sequelize(dbconfig.database as string, dbconfig.username as string, dbconfig.password, {
  host: dbconfig.host,
  dialect: "mysql",
});

User.initialize(db);
Post.initialize(db);
Comment.initialize(db);
Like.initialize(db);
Story.initialize(db);

User.associate();
Post.associate();
Comment.associate();
Like.associate();
Story.associate();
