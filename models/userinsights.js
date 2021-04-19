'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserInsights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ Users, Topics }) {
      this.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'id' })
      this.belongsTo(Topics, { foreignKey: 'name', targetKey: 'name' })
    }
  }

  UserInsights.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    is_interested: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserInsights',
  })
  return UserInsights
}
