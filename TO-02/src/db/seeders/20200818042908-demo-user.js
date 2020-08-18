'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users', [{
    id:1,
    full_name:'full_user1',
    username: 'user1',
    password: 'password1',
    salt:'aasa3512532as',
    email: 'user1@gmail.com',
    phone_number:6281,
    role:'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id:2,
    full_name:'full_user2',
    username: 'user2',
    password: 'password2',
    salt:'aasa3512532as',
    email: 'user2@gmail.com',
    phone_number:6282,
    role:'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
