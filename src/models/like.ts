
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
      UserId: string;
      PostId: number;
      createdAt?: Date;
      updatedAt?: Date;
  }

  export class Like extends Model implements LikeAttributes {
      public UserId: string;
      public PostId: number;
      
      public readonly createdAt!: Date;
      public readonly updatedAt!: Date;

      public readonly users: User[];
      public readonly posts: Post[];
      public static associations: {
          users: Association<Like, User>;
          posts: Association<Like, Post>;
      }

      static initialize(sequelize: Sequelize){
          this.init({
              UserId: {
                  type: DataTypes.STRING,
                  primaryKey: true,
              },
              PostId: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
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