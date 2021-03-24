const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  const MapEncounter = sequelize.define("MapEncounter", {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.STRING
    }
  });

  MapEncounter.associate = function (models) {
    // each encounter *here* belongs to ONE map
    MapEncounter.hasMany(models.Map);

    //
    MapEncounter.hasMany(models.Encounter);
  };

  return MapEncounter;
};
