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
        'tbl_teams',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          fullname_team: {
            type: Sequelize.DataTypes.STRING,
          },
          logo: {
            type: Sequelize.DataTypes.STRING,
          },
          base: {
            type: Sequelize.DataTypes.STRING,
          },
          team_chief: {
            type: Sequelize.DataTypes.STRING,
          },
          technical_chief: {
            type: Sequelize.DataTypes.STRING,
          },
          chassis: {
            type: Sequelize.DataTypes.STRING,
          },
          power_unit: {
            type: Sequelize.DataTypes.STRING,
          },
          first_team_entry: {
            type: Sequelize.DataTypes.INTEGER,
          },
          world_championships: {
            type: Sequelize.DataTypes.INTEGER,
          },
          highest_race_finish: {
            type: Sequelize.DataTypes.INTEGER,
          },
          pole_positions: {
            type: Sequelize.DataTypes.INTEGER,
          },
          fastest_laps: {
            type: Sequelize.DataTypes.INTEGER,
          },
          bio: {
            type: Sequelize.DataTypes.TEXT('long'),
            allowNull: true
          },
          images: {
            type: Sequelize.DataTypes.ARRAY,
            allowNull: true,
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
      await queryInterface.dropTable('tbl_teams', { transaction })
    })
  }
};
