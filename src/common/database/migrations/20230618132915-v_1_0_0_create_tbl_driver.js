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
        'tbl_drivers',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          team_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: true,
            references: {
              model: 'tbl_teams',
              key: 'id',
            },
          },
          driver_number: {
            type: Sequelize.DataTypes.INTEGER,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
          },
          bio: {
            type: Sequelize.DataTypes.TEXT('long'),
            allowNull: true
          },
          country: {
            type: Sequelize.DataTypes.STRING,
          },
          podiums: {
            type: Sequelize.DataTypes.INTEGER,
          },
          points: {
            type: Sequelize.DataTypes.INTEGER,
          },
          grands_prix_entered: {
            type: Sequelize.DataTypes.INTEGER,
          },
          world_championships: {
            type: Sequelize.DataTypes.INTEGER,
          },
          highest_race_finish: {
            type: Sequelize.DataTypes.INTEGER,
          },
          highest_grid_position: {
            type: Sequelize.DataTypes.INTEGER,
          },
          date_of_birth: {
            type: Sequelize.DataTypes.DATE,
          },
          place_of_birth: {
            type: Sequelize.DataTypes.STRING,
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
