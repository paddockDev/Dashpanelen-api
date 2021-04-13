'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate ({ UserProfiles, UserInsights }) {
      this.hasOne(UserProfiles, { foreignKey: 'id', targetKey: 'user_id' })
      this.hasMany(UserInsights, { foreignKey: 'id', targetKey: 'user_id' })
    }
  }

  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Users',
  })

  return Users
}
