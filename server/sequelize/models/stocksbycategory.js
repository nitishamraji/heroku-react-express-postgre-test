'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StocksByCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StocksByCategory.init({
    doc: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'StocksByCategory',
  });
  return StocksByCategory;
};