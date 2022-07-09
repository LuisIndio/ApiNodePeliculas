module.exports = (sequelize, Sequelize) => {
    const Pelicula = sequelize.define('pelicula', {
        nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        codigo: {
            type: Sequelize.INTEGER
        },
        descripcion: {
            type: Sequelize.STRING
        },
    }, {

    });
    return Pelicula;
}