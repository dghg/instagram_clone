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
import { SequelizeAttributes} from '../typings/SequelizeAttributes';

import {User} from './user';
import {Post} from './post';


export interface CommentAttributes {
    id?: number;
    content: string;
    userId: string;
    postId: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Comment extends Model<CommentAttributes> implements CommentAttributes {
    public id!: number;
    public content: string;
    public userId: string;
    public postId: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
    static initialize(sequelize: Sequelize) {
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
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            postId: {
                type: DataTypes.INTEGER,
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
              tableName: 'comments',
          });
    };

    static associate() {
        this.belongsTo(User, {foreignKey: 'userId'});
        this.belongsTo(Post, {foreignKey: 'postId'});
    };

}