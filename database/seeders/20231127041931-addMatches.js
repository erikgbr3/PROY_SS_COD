'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Matches', [
      {homeTeamId: 1, scoreHome: 0, visitorTeamId: 2, scoreVisitor: 0, date: '2023/01/06', hour: '13:00', leagueId: 1, refereeId: 8, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 3, scoreHome: 0, visitorTeamId: 4, scoreVisitor: 0, date: '2023/01/06', hour: '13:30', leagueId: 1, refereeId: 7, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 5, scoreHome: 0, visitorTeamId: 6, scoreVisitor: 0, date: '2023/01/06', hour: '14:00', leagueId: 1, refereeId: 9, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 2, scoreHome: 0, visitorTeamId: 3, scoreVisitor: 0, date: '2023/01/08', hour: '14:00', leagueId: 1, refereeId: 9, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 4, scoreHome: 0, visitorTeamId: 5, scoreVisitor: 0, date: '2023/01/08', hour: '14:30', leagueId: 1, refereeId: 8, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 6, scoreHome: 0, visitorTeamId: 1, scoreVisitor: 0, date: '2023/01/08', hour: '15:00', leagueId: 1, refereeId: 7, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 3, scoreHome: 0, visitorTeamId: 5, scoreVisitor: 0, date: '2023/01/12', hour: '13:00', leagueId: 1, refereeId: 8, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 6, scoreHome: 0, visitorTeamId: 2, scoreVisitor: 0, date: '2023/01/12', hour: '14:00', leagueId: 1, refereeId: 7, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 2, scoreHome: 0, visitorTeamId: 1, scoreVisitor: 0, date: '2023/01/12', hour: '15:00', leagueId: 1, refereeId: 9, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 4, scoreHome: 0, visitorTeamId: 3, scoreVisitor: 0, date: '2023/01/14', hour: '14:00', leagueId: 1, refereeId: 7, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 6, scoreHome: 0, visitorTeamId: 5, scoreVisitor: 0, date: '2023/01/14', hour: '15:00', leagueId: 1, refereeId: 8, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 3, scoreHome: 0, visitorTeamId: 2, scoreVisitor: 0, date: '2023/01/14', hour: '16:00', leagueId: 1, refereeId: 9, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 5, scoreHome: 0, visitorTeamId: 4, scoreVisitor: 0, date: '2023/01/18', hour: '12:30', leagueId: 1, refereeId: 8, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 1, scoreHome: 0, visitorTeamId: 6, scoreVisitor: 0, date: '2023/01/18', hour: '13:30', leagueId: 1, refereeId: 7, createdAt: new Date(), updatedAt: new Date()},
      {homeTeamId: 5, scoreHome: 0, visitorTeamId: 3, scoreVisitor: 0, date: '2023/01/18', hour: '14:30', leagueId: 1, refereeId: 9, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {  
     await queryInterface.bulkDelete('Matches', null, {});
  }
};
