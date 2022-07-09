const dbConfig = require("../config/db.config");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.personas = require("./persona.model")(sequelize, Sequelize);
db.generos = require("./genero.model")(sequelize, Sequelize);
db.peliculas = require("./pelicula.model")(sequelize, Sequelize);
db.genero_peliculas = require("./generopeliculas.model")(sequelize);


db.peliculas.belongsToMany(db.generos,{through: "genero_peliculas"});
db.generos.belongsToMany(db.peliculas,{through: "genero_peliculas"});


module.exports = db;
