'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Suscription.belongsTo(models.League,
        {
          as: 'league',
          foreignKey: 'leagueId',
        }  
      );
      models.Suscription.belongsTo(models.Club,
        {
          as: 'club', 
          foreignKey: 'clubId',
        }  
      );
    }
  }
  Suscription.init({
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "La liga de registro es obligatoria"
        },
        is: {
          args: /^\d+$/,
          msg: "Solo debe agregar el Id de la liga a la que desea ingresar"
        },
      }
    },
    clubId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "El club es necesario para registrarse",
        },
        is:{
          args: /^\d+$/,
          msg: "Solo debe agregar el Id del club que se va a registrar"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Suscription',
  });
  return Suscription;
};