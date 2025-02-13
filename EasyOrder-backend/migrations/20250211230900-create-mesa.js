'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mesas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      numero_mesa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo_qr: {
        type: Sequelize.STRING,
        allowNull: true
      },
      capacidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      restaurante_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurantes', // Debe coincidir con el nombre en la BD
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      sucursal_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales', // Debe coincidir con el nombre en la BD
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mesas');
  }
};