'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar columnas a la tabla 'restaurantes'
    const columnsRestaurantes = await queryInterface.describeTable('restaurantes');
    if (!columnsRestaurantes.activo) {
      await queryInterface.addColumn('restaurantes', 'activo', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }

    if (!columnsRestaurantes.createdAt) {
      await queryInterface.addColumn('restaurantes', 'createdAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }

    if (!columnsRestaurantes.updatedAt) {
      await queryInterface.addColumn('restaurantes', 'updatedAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }

    // Agregar columnas a la tabla 'sucursales'
    const columnsSucursales = await queryInterface.describeTable('sucursales');
    if (!columnsSucursales.activo) {
      await queryInterface.addColumn('sucursales', 'activo', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }

    if (!columnsSucursales.creado_en) {
      await queryInterface.addColumn('sucursales', 'creado_en', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }

    if (!columnsSucursales.actualizado_en) {
      await queryInterface.addColumn('sucursales', 'actualizado_en', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('restaurantes', 'activo');
    await queryInterface.removeColumn('restaurantes', 'createdAt');
    await queryInterface.removeColumn('restaurantes', 'updatedAt');

    await queryInterface.removeColumn('sucursales', 'activo');
    await queryInterface.removeColumn('sucursales', 'creado_en');
    await queryInterface.removeColumn('sucursales', 'actualizado_en');
  }
};
