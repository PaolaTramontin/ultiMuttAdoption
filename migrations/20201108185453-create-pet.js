'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PetName: {
        type: Sequelize.STRING
      },
      ReferenceId: {
        type: Sequelize.INTEGER
      },
      Contact: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.TEXT
      },
      Location: {
        type: Sequelize.TEXT
      },
      Photo: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pets');
  }
};