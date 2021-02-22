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

        Map.hasMany(models.MapTile)

    };

    return Map;
};
