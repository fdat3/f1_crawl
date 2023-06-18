'use strict';

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
        'tbl_result',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          race_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'tbl_races',
              key: 'id',
            },
          },
          driver_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false,
            references: {
              model: 'tbl_drivers',
              key: 'id',
            },
          },
          no: {
            type: Sequelize.DataTypes.STRING,
          },
          pos: {
            type: Sequelize.DataTypes.INTEGER,
          },
          car: {
            type: Sequelize.DataTypes.STRING,
          },
          laps: {
            type: Sequelize.DataTypes.INTEGER,
          },
          time: {
            type: Sequelize.DataTypes.STRING,
          },
          pts: {
            type: Sequelize.DataTypes.INTEGER,//point
          },
          created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.DataTypes.NOW,
          },
          deleted_at: {
            type: Sequelize.DataTypes.DATE,
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
