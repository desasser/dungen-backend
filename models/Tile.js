module.exports = function (sequelize, DataTypes) {
  var Tile = sequelize.define("Tile", {
    image_url: DataTypes.STRING
  });

  Tile.associate = function (models) {

    Tile.belongsToMany(models.MapTile, { through: 'MapTile_Tile' });

    Tile.belongsTo(models.Environment);

  };

  return Tile;
};