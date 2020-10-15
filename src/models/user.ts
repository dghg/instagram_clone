// User Model

import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes { // declare interface for stricter typecheck 
    id: string;
    password: string;
    user_name: string;
    email: string;
    social: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & { new (values?: object, options?: BuildOptions): UserModel; };

export function UserFactory (sequelize: Sequelize): UserStatic { // All attributes do not allow null 
    return <UserStatic>sequelize.define("Users", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
            defaultValue: "local",
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
}