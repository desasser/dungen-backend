module.exports = function (sequelize, DataTypes) {
  let MapEncounter = sequelize.define("MapEncounter", {
    xCoord: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    yCoord: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  MapEncounter.associate = (models) => {
    // Each MAPENCOUNTER belongs to one MAP
    MapEncounter.belongsTo(models.Map, {
      foreignKey: {
        allowNull: false
      }
    })

    // EACH MAPENCOUNTER belongs to many ENCOUNTERS
    MapEncounter.belongsTo(models.Encounter)
  }
  
  return MapEncounter;
}