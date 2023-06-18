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
            field: 'race_id'
          },
          driver_id: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'driver_id'
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
          transaction,
        },
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
      await queryInterface.dropTable('tbl_result', { transaction })
    })
  }
};
