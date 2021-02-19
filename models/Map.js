module.exports = function (sequelize, DataTypes) {
    var Map = sequelize.define("Map", {
        name: DataTypes.STRING,
        image_url: DataTypes.STRING
    });

    Map.associate = function (models) {
        Map.belongsTo(models.User, {
            foreignKey: {
                allownull: false
            }
        })

        Map.belongsToMany(models.Environment, {through: 'MapEnvironment'});

        Map.hasOne(models.MapTile)

    };

    return Map;
};
