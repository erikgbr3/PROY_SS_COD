'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoalScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.GoalScore.belongsTo(models.Player,
        {
          as: 'player',
          foreignKey: 'playerId',
        }  
      );
      models.GoalScore.belongsTo(models.Match,
        {
          as: 'match',
          foreignKey: 'matchId', 
        }  
      );
    } 
  }
  GoalScore.init({
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
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El puntaje es obligatorio"
        },
        isNumeric: {
        msg: "Solo se admiten números"
        }
      }
    },
    matchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El Id del partido es obligatorio"
        },
        isNumeric: {
        msg: "Solo se admiten números"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'GoalScore',
  });
  return GoalScore;
};