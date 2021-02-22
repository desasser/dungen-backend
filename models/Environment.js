module.exports = function (sequelize, DataTypes) {
  var Environment = sequelize.define("Environment", {
      name: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING
  });

  Environment.associate = function (models) {
<<<<<<< HEAD
    Environment.belongsToMany(models.Tile);
=======

      Environment.belongsToMany(models.Map, {through: 'MapEnvironment'});

      Environment.hasMany(models.Tile);

>>>>>>> dev
  };

  return Environment;
};