// User Model

import {
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyAddAssociationMixin,  
  } from "sequelize";
import { SequelizeAttributes } from "../typings/SequelizeAttributes";

import {Post} from './post';
import {Comment} from './comment';
import {Like} from './like';
import {Story} from './story';


export interface UserAttributes { // declare interface for stricter typecheck 
    id: string; // not optional
    password: string;
    user_name: string;
    email: string;
    social?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class User extends Model<UserAttributes> implements UserAttributes {
    public id: string;
    public password: string;
    public user_name: string;
    public email: string;
    public social: string;
 
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getPosts!: HasManyGetAssociationsMixin<Post>;
    public createPost!: HasManyCreateAssociationMixin<Post>;
    public countPosts!: HasManyCountAssociationsMixin;
   
    public getComments!: HasManyGetAssociationsMixin<Comment>;
    public createComment!: HasManyCreateAssociationMixin<Comment>;
    public countComments!: HasManyCountAssociationsMixin;
    
    public getLikes!: HasManyGetAssociationsMixin<Like>;
    public createLike!: HasManyCreateAssociationMixin<Like>;
    public countLikes!: HasManyCountAssociationsMixin;

    public getStories!: HasManyGetAssociationsMixin<Story>;
    public createStory!: HasManyCreateAssociationMixin<Story>;
    public countStories!: HasManyCountAssociationsMixin;
   
    public addFollowings!: BelongsToManyAddAssociationMixin<User, string>;
    public createFollowings!: BelongsToManyCreateAssociationMixin<User>;
    public countFollowings!: BelongsToManyCountAssociationsMixin;

    public addFollowers!: BelongsToManyAddAssociationMixin<User, string>;
    public createFollowers!: BelongsToManyCreateAssociationMixin<User>;
    public countFollowers!: BelongsToManyCountAssociationsMixin;

    public readonly posts?: Post[];
    public readonly comments?: Comment[];
    public readonly likes?: Like[];
    public readonly stories?: Story[];
    public readonly followings?: User[];
    public readonly followers?: User[];

    public static associations: {
        posts: Association<User, Post>;
        comments: Association<User, Comment>;
        likes: Association<User, Like>;
        stories: Association<User, Story>;
        followings: Association<User, User>;
        followers: Association<User, User>;

    };

    static initialize(sequelize: Sequelize) {
      this.init({
          id: {
            type: DataTypes.STRING,
            primaryKey: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          user_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,

          },
          social: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'local',
          },
          createdAt: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW,
          },
          updatedAt: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW,
          }
      },{
          sequelize,
          tableName: 'users',
      });
    };

    static associate() {
        this.hasMany(Post, {as: 'posts', foreignKey: 'userId'});
        this.hasMany(Comment, {as: 'comments', foreignKey: 'userId'});
        this.hasMany(Like, {as: 'likes', foreignKey: 'userId'});
        this.hasMany(Story, {as: 'stories', foreignKey: 'userId'});
        this.belongsToMany(this, {through: 'follow', as: 'followers', foreignKey: 'followingId'});
        this.belongsToMany(this, {through: 'follow', as: 'followings', foreignKey: 'followedId'});

    }
};
