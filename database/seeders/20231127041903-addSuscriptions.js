'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Suscriptions', [
      {leagueId: 2, clubId: 2, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 1, clubId: 1, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 1, clubId: 2, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 3, clubId: 2, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 4, clubId: 2, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 5, clubId: 2, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 2, clubId: 1, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 3, clubId: 1, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 4, clubId: 1, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 5, clubId: 1, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 1, clubId: 3, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 2, clubId: 4, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 3, clubId: 4, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 4, clubId: 3, createdAt: new Date(), updatedAt: new Date()},
      {leagueId: 5, clubId: 6, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Suscriptions', null, {});  
  }
};
