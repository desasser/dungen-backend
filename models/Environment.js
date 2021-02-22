module.exports = function (sequelize, DataTypes) {
  var Environment = sequelize.define("Environment", {
      name: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING
  });

  Environment.associate = function (models) {
    Environment.belongsToMany(models.Tile);
  };

  return Environment;
};