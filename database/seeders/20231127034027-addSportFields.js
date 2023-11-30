'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SportFields', [
      {ubication: "Izúcar", name: 'Campo de Izúcar', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "San Martín", name: 'Campo de San Martín', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "Raboso", name: 'Campo de Raboso', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "Xuchapa", name: 'Campo de Xuchapa', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "Axochiapan", name: 'Campo de Axochiapan', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "Ayutla", name: 'Campo de Ayutla', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "Chietla", name: 'Campo de Chietla', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "Atlixco", name: 'La Alfonsina', createdAt: new Date(), updatedAt: new Date()},
      {ubication: "Tepeojuma", name: 'campo de Tepeojuma', createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {   
    await queryInterface.bulkDelete('SportFields', null, {});  
  }
};
