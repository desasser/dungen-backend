module.exports = function (sequelize, DataTypes) {
  let MapTile = sequelize.define("MapTile", {
    x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    y: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rotation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mirror: {
      type: DataTypes.STRING,
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