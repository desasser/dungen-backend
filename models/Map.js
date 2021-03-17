module.exports = function (sequelize, DataTypes) {
    var Map = sequelize.define("Map", {
        name: DataTypes.STRING,
        image_url: DataTypes.STRING,
        row: DataTypes.NUMBER,
        column: DataTypes.NUMBER,
        public: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
          }
    });

    Map.associate = function (models) {
        // Each map belongs to one USER
        Map.belongsTo(models.User, {
            foreignKey: {
                allownull: false
            }
        })

        // Each map has many MAPTILES
        Map.hasMany(models.MapTile)
    };

    return Map;
};
