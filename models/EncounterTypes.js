module.exports = function (sequelize, DataTypes) {
    var EncounterType = sequelize.define("EncounterType", {
        type: DataTypes.STRING,
    });

    EncounterType.associate = function (models) {
        EncounterType.hasMany(models.Encounter)
    };
    return EncounterType;
};