module.exports = (sequelize, Sequelize) => {
    const Genero = sequelize.define('genero', {
        nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
    }, {
    });
    return Genero;
}