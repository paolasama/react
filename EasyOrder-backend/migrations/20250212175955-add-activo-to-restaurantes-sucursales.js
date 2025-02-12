'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Comprobar si la columna 'activo' ya existe en la tabla 'Restaurantes'
    const columnsRestaurantes = await queryInterface.describeTable('Restaurantes');
    if (!columnsRestaurantes.activo) {
      await queryInterface.addColumn('Restaurantes', 'activo', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }

    if (!columnsRestaurantes.createdAt) {
      await queryInterface.addColumn('Restaurantes', 'createdAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }

    if (!columnsRestaurantes.updatedAt) {
      await queryInterface.addColumn('Restaurantes', 'updatedAt', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }

    // Comprobar si la columna 'activo' ya existe en la tabla 'Sucursals'
    const columnsSucursales = await queryInterface.describeTable('Sucursals');
    if (!columnsSucursales.activo) {
      await queryInterface.addColumn('Sucursals', 'activo', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }

    if (!columnsSucursales.creado_en) {
      await queryInterface.addColumn('Sucursals', 'creado_en', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }

    if (!columnsSucursales.actualizado_en) {
      await queryInterface.addColumn('Sucursals', 'actualizado_en', {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar las columnas en caso de rollback
    await queryInterface.removeColumn('Restaurantes', 'activo');
    await queryInterface.removeColumn('Restaurantes', 'createdAt');
    await queryInterface.removeColumn('Restaurantes', 'updatedAt');

    await queryInterface.removeColumn('Sucursals', 'activo');
    await queryInterface.removeColumn('Sucursals', 'creado_en');
    await queryInterface.removeColumn('Sucursals', 'actualizado_en');
  }
};
