// models/menu.js
module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });
  
    return Menu;
  };
  