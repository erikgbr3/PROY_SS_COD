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
        type: Sequelize.INTEGER,
        references: {
          model: 'Clubs',
          key: 'id'
        },
        allowNull: false
      },
      scoreHome: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      visitorTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clubs',
          key: 'id'
        }
      },
      scoreVisitor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      date: {
        type: Sequelize.STRING
      },
      hour: {
        type: Sequelize.STRING
      },
      leagueId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Leagues',
          key: 'id'
        }
      },
      refereeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
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