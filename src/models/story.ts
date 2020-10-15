import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface StoryAttributes {
    id: number;
    img: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface StoryModel extends Model<StoryAttributes>, StoryAttributes {}

export class Story extends Model<StoryModel, StoryAttributes> {}

export type StoryStatic = typeof Model & { new (values?: object, options?: BuildOptions): StoryModel;};

export function StoryFactory (sequelize: Sequelize): StoryStatic {
    return <StoryStatic>sequelize.define('Stories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
}
