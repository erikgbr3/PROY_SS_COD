'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SportField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.SportField.hasOne(models.Club,
        {
          as: 'club',
          foreignKey: 'fieldId',
        }  
      );
    }
  }
  SportField.init({
    ubication: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s ]+$/,
          msg: "La ubicación no debe contener Números"
        }
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s ]+$/,
          msg: "El Nombre no debe contener Números"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SportField',
  });
  return SportField;
};