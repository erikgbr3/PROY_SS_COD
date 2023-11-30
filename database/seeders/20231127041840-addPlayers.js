'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Players', [
      {name: "Erik", lastname: 'Gomez', age: '24', numberjersey: '18', position: 'Medio', cellphone: '2431550573', curp: 'GOBE991118HPLMRR03', clubId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "Daniel", lastname: 'Vazquez', age: '22', numberjersey: '07', position: 'Delantero', cellphone: '2431899078', curp: 'ALEXIS211706HTR3', clubId: 1, createdAt: new Date(), updatedAt: new Date()},
      {name: "Alexis", lastname: 'Salmeron', age: '22', numberjersey: '20', position: 'Delantero', cellphone: '2438905678', curp: 'DANI299102DINHUU5', clubId: 3, createdAt: new Date(), updatedAt: new Date()},
      {name: "Jason", lastname: 'Vazquez', age: '23', numberjersey: '11', position: 'Delantero', cellphone: '2449002365', curp: 'JASON000615GDFER12', clubId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "Justin", lastname: 'Salazar', age: '23', numberjersey: '13', position: 'Medio', cellphone: '2258974589', curp: 'JUST20523MTWRK2', clubId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: "Victor", lastname: 'Xoyatla', age: '23', numberjersey: '04', position: 'Defensa', cellphone: '2441236534', curp: 'VICT123490DJSJ323', clubId: 5, createdAt: new Date(), updatedAt: new Date()},
      {name: "Ariel", lastname: 'Campos', age: '19', numberjersey: '06', position: 'Defensa', cellphone: '2445472546', curp: 'ARIE245233DKAKS22', clubId: 2, createdAt: new Date(), updatedAt: new Date()},
      {name: "Angel", lastname: 'Alonso', age: '19', numberjersey: '09', position: 'Defensa', cellphone: '2447648900', curp: 'ANGE203582FAGDG42', clubId: 4, createdAt: new Date(), updatedAt: new Date()},
      {name: "Jerson", lastname: 'Flores', age: '19', numberjersey: '16', position: 'Medio', cellphone: '2444327512', curp: 'JERS218976DGTNTW02', clubId: 5, createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Players', null, {});
    
  }
};
