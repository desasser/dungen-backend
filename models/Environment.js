module.exports = function (sequelize, DataTypes) {
  var Environment = sequelize.define("Environment", {
    name: DataTypes.STRING,
    thumbnail_url: DataTypes.STRING
  });

  Environment.associate = function (models) {
    // Environment belongs to many maps
    Environment.hasMany(models.Map);
  };

  return Environment;
};