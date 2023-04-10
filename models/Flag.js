const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Flag extends Model { };

userFlags.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'post_id',
      },
    },
  },
  {    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userTags",
  }
);

module.exports = Flag;