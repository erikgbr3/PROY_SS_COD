'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Club.hasMany(models.Suscription,
        {
          as: 'suscription',
          foreignKey: 'clubId',
        }   
      );
      models.Club.belongsTo(models.SportField,
        {
          as: 'sportfield',
          foreignKey: 'fieldId',
        }  
      );
      models.Club.belongsTo(models.User,
        {
          as: 'owner',
          foreignKey: 'ownerTeamId'
        }
      );
      models.Club.hasMany(models.Player,
        {
          as: 'players',
          foreignKey: 'clubId',
        }  
      );
      models.Club.hasOne(models.Match,
        {
          as: 'match',
          foreignKey: 'homeTeamId',
        }  
      );
      models.Club.hasOne(models.Match,
        {
          as: 'matches',
          foreignKey: 'visitorTeamId',
        }  
      );
      models.Club.hasOne(models.PositionTableLeague,
        {
          as: 'position',
          foreignKey: 'clubId',
        }  
      );
    }
  }
  Club.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s ]+$/,
          msg: "El Nombre no debe contener Números"
        }
      }
    },
    locality: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is: {
          args: /^[a-zA-ZáéíóúñÁÉÍÓÚ\s ]+$/,
          msg: "El Nombre de la localidad no debe contener Números"
        }
      }
    },
    fieldId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: {
          msg: "Solo se permiten números."
        }
      }
    },
    ownerTeamId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: {
          msg: "Solo se permiten números."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};