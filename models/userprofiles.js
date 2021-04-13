'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ Users }) {
      this.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'id' })
    }
  }

  UserProfiles.init({
    user_id: DataTypes.INTEGER,
    lang: DataTypes.STRING,
    job: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProfiles',
  })
  return UserProfiles
}
