module.exports = function (sequelize, DataTypes) {
  var TileSet = sequelize.define("TileSet", {
      name: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING
  });

  TileSet.associate = function (models) {
    // TileSet belongs to many tiles
      TileSet.hasMany(models.Tile);
  };

  return TileSet;
};