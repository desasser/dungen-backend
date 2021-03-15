module.exports = function (sequelize, DataTypes) {
    var Encounter = sequelize.define("Encounter", {
        type: DataTypes.STRING,
        name: DataTypes.STRING,
        cr: DataTypes.STRING,
        dc: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Encounter;
};