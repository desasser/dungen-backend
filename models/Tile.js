module.exports = function (sequelize, DataTypes) {
  var Tile = sequelize.define("Tile", {
      image_url: DataTypes.STRING
  });

  Tile.associate = function (models) {

      Tile.belongsToMany(models.MapTile, {through: 'MapTile_Tile'});

      Tile.belongsToMany(models.Environment, {through: 'TileEnvironment'});

      Tile.hasMany(models.Environment, {
        foreignKey: {
          name: 'environmentId',
          allowNull: false
        }
      });

  };

  return Tile;
};