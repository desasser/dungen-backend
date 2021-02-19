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
    
  }})

  MapTile.associate = (models) => {
    MapTile.belongsTo(models.Map, {
      foreignKey: {
        allowNull: false
      }
    })

    MapTile.belongsToMany(models.Tile, {through: 'MapTile_Tile'})
  }
  
  return MapTile;
}