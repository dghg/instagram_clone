import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface LikeAttributes {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LikeModel extends Model<LikeAttributes>, LikeAttributes {}

export class Like extends Model<LikeModel, LikeAttributes> {}

export type LikeStatic = typeof Model & {new (values?: object, options?: BuildOptions): LikeModel;};

export function LikeFactory (sequelize: Sequelize): LikeStatic {
  return <LikeStatic>sequelize.define("Likes", {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

  })
};