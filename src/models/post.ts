// User Model

import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface PostAttributes {
    id: number;
    content: string;
    img: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PostModel extends Model<PostAttributes>, PostAttributes {}

export class Post extends Model<PostModel, PostAttributes> {}

export type PostStatic = typeof Model & { new (values?: object, options?: BuildOptions): PostModel;};

export function PostFactory (sequelize: Sequelize): PostStatic {
    return <PostStatic>sequelize.define("Posts", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      img: {
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
