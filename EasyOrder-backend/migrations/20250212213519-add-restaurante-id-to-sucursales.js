'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sucursales', 'restaurante_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'restaurantes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sucursales', 'restaurante_id');
  }
};