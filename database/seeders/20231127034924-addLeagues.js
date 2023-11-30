'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Leagues', [
      {name: "Liga Regional Tlaloc", cost: 200, prize: '200', init: '2023/07/06', description: 'Liga del Estado de Puebla', ownerId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "Los Cachondos", cost: 400, prize: '400', init: '2023/12/19', description: 'Liga en Atlixco', ownerId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: "Liga UTIM", cost: 159, prize: '159', init: '2023/10/29', description: 'Liga en la UTIM', ownerId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: "Izúcar", cost: 200, prize: '200', init: '2023/11/29', description: 'Liga en Izúcar', ownerId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "Izucar de Matamoros", cost: 300, prize: '300', init: '2023/09/29', description: 'Liga en Izúcar de Matamoros', ownerId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: "Liga Atlixco", cost: 200, prize: '200', init: '2023/07/19', description: 'Liga de Atlixco', ownerId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: "Liga Izucar Juvenil", cost: 200, prize: '200', init: '2023/05/22', description: 'Liga para jovenes', createdAt: new Date(), ownerId: 1, updatedAt: new Date()},
      {name: "UTIM", cost: 250, prize: '250', init: '2023/08/25', description: 'Liga en la Universidad  Tecnilogica de Izucar de Matamoros', ownerId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: "TICSI", cost: 250, prize: '250', init: '2023/06/21', description: 'Liga para los alumnos de tecnologias de la información', ownerId: 3, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Leagues', null, {});
  }
};
