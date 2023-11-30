'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Clubs', [
      {name: "Izucar", locality: 'Izúcar de Matamoros', fieldId: 1, ownerTeamId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "Atletico", locality: 'San Juan Raboso', fieldId: 1, ownerTeamId: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: "Las Flores", locality: 'San Martin La Flor', fieldId: 2, ownerTeamId: 6, createdAt: new Date(), updatedAt: new Date()},
      {name: "Los Escondidos", locality: 'Agua Escondida', fieldId: 4, ownerTeamId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "Los Santos", locality: 'Santa Barbara', fieldId: 5, ownerTeamId: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: "Mas Uno", locality: 'Matzaco', fieldId: 6, ownerTeamId: 6, createdAt: new Date(), updatedAt: new Date()},
      {name: "XWA", locality: 'Xuchapa', fieldId: 7, ownerTeamId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "Equipo Lucas", locality: 'San Lucas', fieldId: 8, ownerTeamId: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: "Los Magos", locality: 'Atlixco', fieldId: 9, ownerTeamId: 6, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Clubs', null, {}); 
  }
};
