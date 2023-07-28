'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class League extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.League.belongsTo(models.User, 
        {
        as: 'user',
        foreignKey: 'ownerId', 
      });
      models.League.hasMany(models.Suscription,
        {
          as: 'suscription',
          foreignKey: 'leagueId',
        }  
      );
      models.League.hasMany(models.Match,
        {
          as: 'match',
          foreignKey: 'leagueId', 
        }  
      );
      models.League.hasOne(models.PositionTableLeague,
        {
          as: 'position',
          foreignKey: 'leagueId',
        }  
      );
    }
  }
  League.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "El Nombre de la liga es obligatorio"
        }
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "El costo de inscripción es obligatorio"
        },
        is: {
          args: /^\d+$/,
          msg: "Ingrese el costo en cantidad númerica"
        }
      }
    },
    prize: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "La premiación es obligatoria."
        }
      }
    },
    init: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: "La fecha de inicio es obligatoria."
        },
        is:{
          args: /^(\d{4})\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
          msg: "Formato de fecha no aceptado."
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull:{
          msg: "La descripción es obligatoria."
        }
      }
    },
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "El propietario es obligatorio"
        },
        isNumeric:{
          msg: "Debe ser un dato de tipo númerico."
        }
      }

    },
  }, {
    sequelize,
    modelName: 'League',
  });
  return League;
};