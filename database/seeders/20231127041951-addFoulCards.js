'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('FoulCards', [
      {playerId: 1, matchId: 1, color: 'red', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 2, matchId: 1, color: 'orange', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 3, matchId: 2, color: 'yellow', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 4, matchId: 2, color: 'yellow', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 5, matchId: 1, color: 'orange', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 6, matchId: 3, color: 'red', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 7, matchId: 4, color: 'orange', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 8, matchId: 5, color: 'red', createdAt: new Date(), updatedAt: new Date()},
      {playerId: 9, matchId: 5, color: 'yellow', createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('FoulCards', null, {});
  }
};
