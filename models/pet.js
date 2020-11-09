'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.pet.belongsToMany(models.user, {through: 'userpet'})
    }
  };
  pet.init({
    PetName: DataTypes.STRING,
    ReferenceId: DataTypes.INTEGER,
    Contact: DataTypes.STRING,
    Status: DataTypes.STRING,
    Description: DataTypes.TEXT,
    Location: DataTypes.TEXT,
    Photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'pet',
  });
  return pet;
};