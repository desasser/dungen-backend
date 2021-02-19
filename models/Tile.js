module.exports = function (sequelize, DataTypes) {
  var Tile = sequelize.define("Tile", {
      image_url: DataTypes.STRING
  });

  Tile.associate = function (models) {

      Tile.belongsToMany(models.MapTile, {
        onDelete: "SET NULL"
      });

      Tile.hasMany(models.Environment, {
        foreignKey: {
          name: 'environmentId',
          allowNull: false
        }
      });

  };

  return Tile;
};