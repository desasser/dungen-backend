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
            allowNull: false
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
            allowNull: true,
            defaultValue: false
          }
            
    })

    User.associate = function (models) {
        User.hasMany(models.Map);

        // self referencing many-to-many association in tables
        User.belongsToMany(models.User, { as: 'Follower', through: 'UserFollower' });

        // favorites table
        User.belongsToMany(models.Map, { as: 'Favorite', through: 'Favorites' })
    }

     User.beforeCreate(function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
     })
    
    return User;
};