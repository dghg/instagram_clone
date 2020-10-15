import {BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CommentAttributes {
    id: number;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CommentModel extends Model<CommentAttributes>, CommentAttributes {}

export class Comment extends Model<CommentModel, CommentAttributes> {}

export type CommentStatic = typeof Model & {new (values?: object, options?: BuildOptions): CommentModel};

export function CommentFactory (sequelize: Sequelize): CommentStatic {
    return <CommentStatic>sequelize.define("Comments", {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      content: {
          type: DataTypes.STRING,
          allowNull: false,
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
    });
};
