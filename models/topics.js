'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Topics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }

  Topics.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    another_url: DataTypes.STRING,
    creator: DataTypes.STRING,
    first_release: DataTypes.DATE,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topics',
  })
  return Topics
}
