module.exports = function (sequelize, DataTypes) {
    var Map = sequelize.define("Map", {
        name: DataTypes.STRING,
        image_url: {
            type: DataTypes.TEXT('long'),

        },
        environment: DataTypes.INTEGER,
        rows: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        columns: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
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
                allowNull: false
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
