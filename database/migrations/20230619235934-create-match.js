'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeamId: {
        type: Sequelize.INTEGER
      },
      scoreHome: {
        type: Sequelize.INTEGER
      },
      visitorTeamId: {
        type: Sequelize.INTEGER
      },
      scoreVisitor: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      hour: {
        type: Sequelize.TIME
      },
      leagueId: {
        type: Sequelize.INTEGER
      },
      refereeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  }
};