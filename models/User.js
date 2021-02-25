const bcrypt = require("bcrypt")

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
          },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        name: DataTypes.STRING,
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          }
            
    })

    User.associate = function (models) {
        User.hasMany(models.Map)
    }

     User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, brcypt.genSaltSync(10), null)
     })
    
    return User;
};