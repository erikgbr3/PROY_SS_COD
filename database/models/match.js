'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Match.belongsTo(models.Club, 
        {
          as: 'club',
          foreignKey: 'homeTeamId',
        }  
      );
      models.Match.belongsTo(models.Club,
        {
          as: 'clubs',
          foreignKey: 'visitorTeamId',
        }  
      );
      models.Match.belongsTo(models.League,
        {
          as: 'league',
          foreignKey: 'leagueId',
        }  
      );
      models.Match.belongsTo(models.User,
        {
          as: 'referee',
          foreignKey: 'refereeId'
        }
      );
      models.Match.hasMany(models.GoalScore,
        {
          as: 'goalscore',
          foreignKey: 'matchId',
        }  
      );
      models.Match.hasMany(models.FoulCard,
        {
          as: 'foulcard',
          foreignKey: 'matchId',
        }  
      );
    }
  }
  Match.init({
    homeTeamId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: {
          msg: "Solo se permiten números."
        }
      }
    },
    scoreHome: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: {
          msg: "Solo se permiten números."
        }
      }
    },
    visitorTeamId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: {
          msg: "Solo se permiten números."
        }
      }
    },
    scoreVisitor: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: {
          msg: "Solo se permiten números."
        }
      }
    },
    date: DataTypes.STRING,
    hour: DataTypes.STRING,
    leagueId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        isInt: {
          msg: "Solo se permiten números."
        }
      }
    },
    refereeId: {
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
    modelName: 'Match',
  });
  return Match;
};