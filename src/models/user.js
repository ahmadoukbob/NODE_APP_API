module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      
      username: {
        type: DataTypes.STRING,
        msg: 'Le nom est déjà pris'
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }