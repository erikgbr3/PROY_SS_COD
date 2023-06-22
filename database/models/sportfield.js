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
    ubication: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SportField',
  });
  return SportField;
};