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
import {Story} from './story';
import { Like } from "./like";


export interface UserAttributes { // declare interface for stricter typecheck 
    id: string; // not optional
    password: string;
    user_name: string;
    email: string;
    social?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class User extends Model implements UserAttributes {
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
    
    public getStories!: HasManyGetAssociationsMixin<Story>;
    public createStory!: HasManyCreateAssociationMixin<Story>;
    public countStories!: HasManyCountAssociationsMixin;
   
    public getLikes!: BelongsToManyGetAssociationsMixin<Post>;
    public addLikes!: BelongsToManyAddAssociationMixin<Post, number>;
    public createLikes!: BelongsToManyCreateAssociationMixin<Post>;
    public countLikes!: BelongsToManyCountAssociationsMixin;

    public addFollowings!: BelongsToManyAddAssociationMixin<User, string>;
    public getFollowings!: BelongsToManyGetAssociationsMixin<User>;
    public createFollowings!: BelongsToManyCreateAssociationMixin<User>;
    public countFollowings!: BelongsToManyCountAssociationsMixin;

    public addFollowers!: BelongsToManyAddAssociationMixin<User, string>;
    public getFollowers!: BelongsToManyGetAssociationsMixin<User>;
    public createFollowers!: BelongsToManyCreateAssociationMixin<User>;
    public countFollowers!: BelongsToManyCountAssociationsMixin;

    public readonly posts?: Post[];
    public readonly comments?: Comment[];
    public readonly stories?: Story[];
    public readonly followings?: User[];
    public readonly followers?: User[];
    public readonly likes?: Like[];
    
    public static associations: {
        posts: Association<User, Post>;
        comments: Association<User, Comment>;
        stories: Association<User, Story>;
        followings: Association<User, User>;
        followers: Association<User, User>;
        likes: Association<User, Post>;
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
        this.hasMany(Story, {as: 'stories', foreignKey: 'userId'});
        this.belongsToMany(Post, {through: 'likes'});
        this.belongsToMany(this, {through: 'follow', as: 'followers', foreignKey: 'followingId'});
        this.belongsToMany(this, {through: 'follow', as: 'followings', foreignKey: 'followedId'});

    }
};
