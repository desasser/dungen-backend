module.exports = function (sequelize, DataTypes) {
    var Encounter = sequelize.define("Encounter", {
        name: DataTypes.STRING,
        cr: DataTypes.STRING,
        dc: DataTypes.STRING,
        description: DataTypes.STRING
    });
    Encounter.associate = function (models) {
        Encounter.belongsTo(models.EncounterType)
    };
    return Encounter;
};