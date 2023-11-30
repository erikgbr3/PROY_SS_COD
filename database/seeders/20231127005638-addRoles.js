'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {role: "admin", createdAt: new Date(), updatedAt: new Date()},
      {role: "owner", createdAt: new Date(), updatedAt: new Date()},
      {role: "referee", createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
