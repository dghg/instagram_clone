
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

  import {User} from './user';
  import {Post} from './post';

  export interface LikeAttributes {
      id: number;
      UserId: string;
      PostId: number;
      createdAt?: Date;
      updatedAt?: Date;
  }

  export class Like extends Model implements LikeAttributes {
      public id: number;
      public UserId: string;
      public PostId: number;
      
      public readonly createdAt!: Date;
      public readonly updatedAt!: Date;

      static initialize(sequelize: Sequelize){
          this.init({
              id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
              },
              UserId: {
                  type: DataTypes.STRING,
              },
              PostId: {
                  type: DataTypes.INTEGER,
              },
              createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },{
                sequelize,
                tableName: 'likes',
            });
      }
      static associate() {
          this.belongsTo(Post, {foreignKey: 'PostId'});
          this.belongsTo(User, {foreignKey: 'UserId'});
      }
  }