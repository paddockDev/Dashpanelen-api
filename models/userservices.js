'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ Users }) {
      this.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'id' })
    }
  }
  UserServices.init({
    user_id: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    provider_id: DataTypes.STRING,
    provider_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserServices',
  })
  return UserServices
}
