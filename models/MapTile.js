module.exports = function (sequelize, DataTypes) {
  let MapTile = sequelize.define("MapTile", {
    xCoord: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    yCoord: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orientation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mirror: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  MapTile.associate = (models) => {
    // Each MAPTILE belongs to one MAP
    MapTile.belongsTo(models.Map, {
      foreignKey: {
        allowNull: false
      }
    })

    // EACH MAPTILE belongs to many TILES
    MapTile.belongsTo(models.Tile)
  }
  
  return MapTile;
}