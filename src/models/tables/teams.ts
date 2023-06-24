import { DataTypes } from 'sequelize'
import { sequelize, Sequelize } from '../base'

export const Teams = sequelize.define(
    'tbl_teams',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fullname_team: {
            type: DataTypes.STRING,
        },
        logo: {
            type: DataTypes.STRING,
        },
        base: {
            type: DataTypes.STRING,
        },
        team_chief: {
            type: DataTypes.STRING,
        },
        technical_chief: {
            type: DataTypes.STRING,
        },
        chassis: {
            type: DataTypes.STRING,
        },
        power_unit: {
            type: DataTypes.STRING,
        },
        first_team_entry: {
            type: DataTypes.INTEGER,
        },
        world_championships: {
            type: DataTypes.INTEGER,
        },
        highest_race_finish: {
            type: DataTypes.INTEGER,
        },
        pole_positions: {
            type: DataTypes.INTEGER,
        },
        fastest_laps: {
            type: DataTypes.INTEGER,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avatar: {
            type: DataTypes.STRING,
        }
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
