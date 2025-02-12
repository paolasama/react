module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Mesas', 'restaurante_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permite valores nulos
      references: {
        model: 'Restaurantes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('Mesas', 'sucursal_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permite valores nulos
      references: {
        model: 'Sucursales',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Mesas', 'restaurante_id');
    await queryInterface.removeColumn('Mesas', 'sucursal_id');
  }
};