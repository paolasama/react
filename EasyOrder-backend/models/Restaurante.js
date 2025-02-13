const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

if (process.env.USE_DUMMY_DB === 'true') {
  // Datos dummy iniciales para restaurantes
  const dummyRestaurantes = [
    { id: 1, nombre: "Restaurante A", direccion: "Calle 1", activo: true, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, nombre: "Restaurante B", direccion: "Calle 2", activo: true, createdAt: new Date(), updatedAt: new Date() },
  ];
  
  // Simulamos los métodos del modelo real
  const Restaurante = {
    findAll: async () => {
      console.log('Dummy DB: findAll() llamado');
      return dummyRestaurantes;
    },
    create: async (data) => {
      console.log('Dummy DB: create() llamado con datos:', data);
      const newId = dummyRestaurantes.length ? dummyRestaurantes[dummyRestaurantes.length - 1].id + 1 : 1;
      const newRestaurante = {
        id: newId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      dummyRestaurantes.push(newRestaurante);
      return newRestaurante;
    }
  };

  module.exports = Restaurante;
} else {
  // Modelo real utilizando Sequelize (requiere tener instalado sqlite3 u otro paquete)
  const Restaurante = sequelize.define(
    'Restaurante',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      direccion: { type: DataTypes.STRING },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: 'restaurantes',
      timestamps: true,
    }
  );
  module.exports = Restaurante;
}