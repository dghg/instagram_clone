// Post Model

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
  } from "sequelize";

import {User} from './user';
import {Comment} from './comment';
import {Like} from './like';

export interface PostAttributes {
    id?: number;
    content: string;
    img: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Post extends Model<PostAttributes> implements PostAttributes {
    public id!: number;
    public content: string;
    public img: string;
    public userId: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getComments!: HasManyGetAssociationsMixin<Comment>;
    public createComment!: HasManyCreateAssociationMixin<Comment>;
    public countComments!: HasManyCountAssociationsMixin;
    
    public getLikes!: HasManyGetAssociationsMixin<Like>;
    public createLike!: HasManyCreateAssociationMixin<Like>;
    public countLikes!: HasManyCountAssociationsMixin;
    
    public readonly comments?: Comment[];
    public readonly likes?: Like[];
    public static associations: {
        comments: Association<Post, Comment>;
        likes: Association<Post, Like>;
    };

    static initialize(sequelize : Sequelize) {
       this.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
      }, {
          sequelize,
          tableName: 'posts',
      });

   };

   static associate() {
    this.belongsTo(User, {foreignKey: 'userId'});
    this.hasMany(Comment, {as: 'comments', foreignKey: 'postId'});
    this.hasMany(Like, {as: 'likes', foreignKey: 'postId'});
  }   
};


