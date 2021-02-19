const bcrypt = require("bcrypt")

module.exports = function (sequlize, DataTypes) {
    const User = squelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [8]
            }
        }
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    User.associate = function (models) {
        User.hasMany(models.Map)
    }

    return User;
}