module.exports = function (sequelize, DataTypes) {
  var Tile = sequelize.define("Tile", {
    image_url: DataTypes.STRING
  });

  Tile.associate = function (models) {

    Tile.hasMany(models.MapTile);

    Tile.belongsTo(models.TileSet);

  };

  return Tile;
};

