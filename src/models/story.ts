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

export interface StoryAttributes {
    id?: number;
    img: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Story extends Model<StoryAttributes> implements StoryAttributes {
  public id!: number;
  public img: string;
  public userId: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize : Sequelize) {
    this.init({
     id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
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
     },
   }, {
       sequelize,
       tableName: 'stories',
   });
  };

  static associate() {
    this.belongsTo(User, {foreignKey: 'userId'});
  }
}