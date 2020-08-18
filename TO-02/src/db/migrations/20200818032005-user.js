'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name:{
        type:Sequelize.STRING,
      },
      username:{
        type:Sequelize.STRING,
      },
      email:{
        type:Sequelize.STRING,
      },
      phone_number:{
        type:Sequelize.STRING,
      },
      salt:{
        type:Sequelize.STRING,
      },
      password:{
        type:Sequelize.STRING,
      },
      role:{
        type:Sequelize.ENUM,
        values: ['admin', 'user']
      },
      createdAt:{
        type:Sequelize.DATE
      },
      updatedAt:{
        type:Sequelize.DATE
      }

      

    })

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
