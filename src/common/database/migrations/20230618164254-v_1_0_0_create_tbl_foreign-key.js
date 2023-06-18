const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('tbl_results', {
      fields: ['driver_id'],
      type: 'foreign key',
      name: 'driver_id',
      references: {
        table: 'tbl_drivers',
        field: 'id'
      }
    })
    await queryInterface.addConstraint('tbl_results', {
      fields: ['race_id'],
      type: 'foreign key',
      name: 'race_id',
      references: {
        table: 'tbl_races',
        field: 'id'
      }
    })
    await queryInterface.addConstraint('tbl_drivers', {
      fields: ['team_id'],
      type: 'foreign key',
      name: 'team_id',
      references: {
        table: 'tbl_teams',
        field: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tbl_results', 'driver_id')
    await queryInterface.removeConstraint('tbl_results', 'race_id')
    await queryInterface.removeConstraint('tbl_drivers', 'team_id')
  }
};