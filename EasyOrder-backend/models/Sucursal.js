const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

if (process.env.USE_DUMMY_DB === 'true') {
  // Datos dummy iniciales para sucursales
  const dummySucursales = [
    {
      id: 1,
      nombre: "Sucursal Central",
      direccion: "Avenida Principal 123",
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      nombre: "Sucursal Norte",
      direccion: "Calle Secundaria 456",
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

  // Simulación de los métodos del modelo
  const Sucursal = {
    findAll: async () => {
      console.log('Dummy DB: findAll() llamado para sucursales');
      return dummySucursales;
    },
    create: async (data) => {
      console.log('Dummy DB: create() llamado para sucursal con datos:', data);
      const newId = dummySucursales.length ? dummySucursales[dummySucursales.length - 1].id + 1 : 1;
      const newSucursal = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      dummySucursales.push(newSucursal);
      return newSucursal;
    },
  };

  module.exports = Sucursal;
} else {
  // Modo real: definir el modelo con Sequelize (PostgreSQL, por ejemplo)
  const Sucursal = sequelize.define(
    'Sucursal',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      direccion: { type: DataTypes.STRING },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
      // Se agrega la columna para la asociación con Restaurante.
      // Al quitar el "field" y configurar "underscored: true" en las opciones,
      // Sequelize transformará automáticamente "restauranteId" a "restaurante_id" en la base de datos.
      restauranteId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'restaurantes', // debe coincidir con el tableName del modelo Restaurante
          key: 'id'
        }
      }
    },
    {
      tableName: 'sucursales',
      timestamps: true,
      underscored: true
    }
  );

  // Definimos que una Sucursal pertenece a un Restaurante
  Sucursal.associate = (models) => {
    Sucursal.belongsTo(models.Restaurante, {
      as: 'Restaurante',
      foreignKey: 'restauranteId'
    });
  };

  module.exports = Sucursal;
}