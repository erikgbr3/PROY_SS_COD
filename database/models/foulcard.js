'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoulCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.FoulCard.belongsTo(models.Player,
        {
          as: 'player',
          foreignKey: 'playerId',
        }  
      );
      models.FoulCard.belongsTo(models.Match,
        {
          as: 'match',
          foreignKey: 'matchId',
        }   
      );
    }
  }
  FoulCard.init({
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El Id del jugador es obligatorio"
        },
        isNumeric: {
          msg: "Solo se admiten números"
        }
      }
    },

    matchId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El Id del partido es obligatorio"
        },
        isNumeric: {
          msg: "Solo se admiten números"
        }
      }
    },
    color: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El color de la tarjeta es obligatorio"
        },
        isAlpha: {
          msg: "Solo se admiten letras"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'FoulCard',
  });
  return FoulCard;
};