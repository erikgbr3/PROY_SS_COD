'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {username: "Erik", email: 'erikg3687@gmail.com', password: 'qwerty11', roleId: 1, createdAt: new Date(), updatedAt: new Date()},
      {username: "Daniel", email: 'dani90@gmail.com', password: 'qwerty22', roleId: 1, createdAt: new Date(), updatedAt: new Date()},
      {username: "Alexis", email: 'alexis03@gmail.com', password: 'qwerty33', roleId: 1, createdAt: new Date(), updatedAt: new Date()},
      {username: "Jason", email: 'jason05@gmail.com', password: 'qwerty44', roleId: 2, createdAt: new Date(), updatedAt: new Date()},
      {username: "Justin", email: 'justin01@gmail.com', password: 'qwerty55', roleId: 2, createdAt: new Date(), updatedAt: new Date()},
      {username: "Victor", email: 'victor01@gmail.com', password: 'qwerty66', roleId: 2, createdAt: new Date(), updatedAt: new Date()},
      {username: "Ariel", email: 'ariel04@gmail.com', password: 'qwerty77', roleId: 3, createdAt: new Date(), updatedAt: new Date()},
      {username: "Angel", email: 'angel09@gmail.com', password: 'qwerty88', roleId: 3, createdAt: new Date(), updatedAt: new Date()},
      {username: "Jerson", email: 'jerson11@gmail.com', password: 'qwerty99', roleId: 3, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
