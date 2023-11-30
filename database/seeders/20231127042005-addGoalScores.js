'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GoalScores', [
      {playerId: 1, score: 2, matchId: 1, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 2, score: 4, matchId: 1, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 3, score: 6, matchId: 2, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 4, score: 6, matchId: 2, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 5, score: 6, matchId: 1, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 6, score: 4, matchId: 3, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 7, score: 5, matchId: 4, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 8, score: 4, matchId: 5, createdAt: new Date(), updatedAt: new Date()},
      {playerId: 9, score: 5, matchId: 5, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('GoalScores', null, {});
  }
};
