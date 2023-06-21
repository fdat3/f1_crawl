'use strict';

const DataTypes = require('sequelize').DataTypes

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
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
            field: 'team_id'
          },
          driver_number: {
            type: DataTypes.INTEGER,
          },
          name: {
            type: DataTypes.STRING,
          },
          bio: {
            type: DataTypes.TEXT('long'),
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
            type: DataTypes.STRING,
          },
          place_of_birth: {
            type: DataTypes.STRING,
          },
          avatar: {
            type: DataTypes.STRING,
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
          transaction,
        }
      )
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('tbl_drivers', { transaction })
    })
  }
};
