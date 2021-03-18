module.exports = function (sequelize, DataTypes) {
    var Map = sequelize.define("Map", {
        name: DataTypes.STRING,
        image_url: DataTypes.STRING,
        environment: DataTypes.STRING,
        row: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultVaule: null
        },
        column: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultVaule: null
        },
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
        Map.belongsTo(models.Environment)

        // Each map has many MAPTILES
        Map.hasMany(models.MapTile)

        // favorites table
        Map.belongsToMany(models.User, { as: 'Favorite', through: 'Favorites' })
    };

    return Map;
};
