module.exports = function (sequelize, DataTypes) {
  var Environment = sequelize.define("Environment", {
      name: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING
  });

  Environment.associate = function (models) {

      Environment.belongsToMany(models.Map, {through: 'MapEnvironment'});

      Environment.belongsToMany(models.Tile, {through: 'TileEnvironment'});

  };

  return Environment;
};