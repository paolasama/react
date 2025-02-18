module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('mesas', 'restaurante_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permite valores nulos
      references: {
        model: 'restaurantes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('mesas', 'sucursal_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permite valores nulos
      references: {
        model: 'sucursales',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('mesas', 'restaurante_id');
    await queryInterface.removeColumn('mesas', 'sucursal_id');
  }
};