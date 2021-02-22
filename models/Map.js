module.exports = function (sequelize, DataTypes) {
    var Map = sequelize.define("Map", {
        name: DataTypes.STRING,
        image_url: DataTypes.STRING
    });

    Map.associate = function (models) {
        // Each map belongs to one USER
        Map.belongsTo(models.User, {
            foreignKey: {
                allownull: false
            }
        })

        // Each map has one MAPTILE
        Map.hasOne(models.MapTile)
    };

    return Map;
};
