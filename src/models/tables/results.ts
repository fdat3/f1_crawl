import { DataTypes } from 'sequelize'
import { sequelize, Sequelize } from '../base'

export const Results = sequelize.define(
    'tbl_results',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        race_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tbl_races',
                key: 'id',
            },
        },
        driver_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'tbl_drivers',
                key: 'id',
            },
        },
        no: {
            type: DataTypes.STRING,
        },
        pos: {
            type: DataTypes.INTEGER,
        },
        car: {
            type: DataTypes.STRING,
        },
        laps: {
            type: DataTypes.INTEGER,
        },
        time: {
            type: DataTypes.STRING,
        },
        pts: {
            type: DataTypes.INTEGER,//point
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        hooks: {

        },
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ['deletedAt'] },
        },
        scopes: {
            deleted: {
                where: { deletedAt: { $ne: null } },
                paranoid: false,
            },
        },
    },
)