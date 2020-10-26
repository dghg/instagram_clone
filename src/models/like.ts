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
  import {Post} from './post';

  export interface LikeAttributes {
      id?: number;
      postId: number;
      userId: string;
      createdAt?: Date;
      updatedAt?: Date;
  };

  export class Like extends Model<LikeAttributes> implements LikeAttributes {
      public id!: number;
      public postId: number;
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
         postId: {
             type: DataTypes.INTEGER,
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
           tableName: 'likes',
       });
 
    };
       
      static associate(){
          this.belongsTo(Post, {foreignKey: 'postId'});
          this.belongsTo(User, {foreignKey: 'userId'});
      }
    }

