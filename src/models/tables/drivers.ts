import { DataTypes } from 'sequelize'
import { sequelize, Sequelize } from '../base'

export const Drivers = sequelize.define(
    'tbl_drivers',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        team_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'tbl_teams',
                key: 'id',
            },
        },
        driver_number: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
        },
        podiums: {
            type: DataTypes.INTEGER,
        },
        points: {
            type: DataTypes.DOUBLE,
        },
        grands_prix_entered: {
            type: DataTypes.INTEGER,
        },
        world_championships: {
            type: DataTypes.INTEGER,
        },
        highest_race_finish: {
            type: DataTypes.INTEGER,
        },
        highest_grid_position: {
            type: DataTypes.INTEGER,
        },
        date_of_birth: {
            type: DataTypes.DATE,
        },
        place_of_birth: {
            type: DataTypes.STRING,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
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