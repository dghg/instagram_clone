import { Options } from 'body-parser';
import { Sequelize } from 'sequelize';
import config from '../config/config';

// Database Factory
import {UserFactory} from './user';
import {PostFactory} from './post';
import {CommentFactory} from './comment';
import {StoryFactory} from './story';
import {LikeFactory} from './like';

const dbconfig = process.env.NODE_ENV === 'development' ? config.development : config.production;
export const db = new Sequelize(dbconfig.database as string, dbconfig.username as string, dbconfig.password, {
  host: dbconfig.host,
  dialect: "mysql",
});

export const User = UserFactory(db);
export const Post = PostFactory(db);
export const Comment = CommentFactory(db);
export const Story = StoryFactory(db);
export const Like = LikeFactory(db);
/* associate */ 
// User has many Posts 
User.hasMany(Post);
Post.belongsTo(User);

// Comment has one posts , one writer(User)
User.hasMany(Comment);
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);

// User has many Stories
User.hasMany(Story);
Story.belongsTo(User);

// User has many likes, post has many likes,
User.hasMany(Like);
Post.hasMany(Like);
Like.belongsTo(User);
Like.belongsTo(Post);


//