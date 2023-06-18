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
      await queryInterface.dropTable('tbl_teams', { transaction })
    })
  }
};
