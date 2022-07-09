module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define('persona', {
        nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
    }, {
    });
    return Persona;
}