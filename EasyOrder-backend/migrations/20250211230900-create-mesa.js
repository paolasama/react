// migrations/XXXXXX-create-mesa.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mesas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      numero_mesa: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        defaultValue: 'libre',
      },
      capacidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      activo: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Mesas');
  },
};
