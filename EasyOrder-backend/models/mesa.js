// models/Mesa.js
module.exports = (sequelize, DataTypes) => {
    const Mesa = sequelize.define('Mesa', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Incremento automático
      },
      numero_mesa: {
        type: DataTypes.INTEGER,
        allowNull: false,  // No puede ser nulo
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: 'libre', // Estado por defecto
      },
      capacidad: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Puede ser nulo
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // La mesa está activa por defecto
      },
      restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Relación con restaurante
      },
      sucursal_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Relación con sucursal
      },
    });
  
    return Mesa;
  };
  