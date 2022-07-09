const db = require("../models");

exports.index = async (req, res) => {
    const listaGenerosPeliculas = await db.genero_peliculas.findAll();
    res.send(listaGenerosPeliculas);
}
exports.store = async (req, res) => {
    if(!req.body.peliculaId){
        res.status(400).send({
            message: "El peliculaId es requerido"
        });
        return;
    }
    if(!req.body.generoId){
        res.status(400).send({
            message: "El generoId es requerido"
        });
        return;
    }
    
    const generopeliculas = await db.genero_peliculas.create({
        ...req.body
    });
    res.send(generopeliculas);
}
exports.update = async (req, res) => {
    if(!req.params.generopeliculaid){
        res.status(400).send({
            message: "El id de la generopelicula es requerido"
        });
        return;
    }
    const generopeliculas = await db.genero_peliculas.findByPk(req.params.generopeliculaid);
    if (generopeliculas == null) {
        res.status(404).send({ message: "generopeliculas no encontrada" });
        return;
    }

    if(!req.body.peliculaId){
        res.status(400).send({
            message: "El peliculaId es requerido"
        });
        return;
    }
    if(!req.body.generoId){
        res.status(400).send({
            message: "El generoId es requerido"
        });
        return;
    }
    
    generopeliculas.peliculaId = req.body.peliculaId;
    generopeliculas.generoId = req.body.generoId;

    await generopeliculas.save();

    res.send(generopeliculas);
}
exports.delete = async (req, res) => {
    if(!req.params.generopeliculaid){
        res.status(400).send({
            message: "El id de la generopeliculas es requerido"
        });
        return;
    }
    const generopeliculas = await db.genero_peliculas.findByPk(req.params.generopeliculaid);
    if (generopeliculas == null) {
        res.status(404).send({ message: "generopeliculas no encontrada" });
        return;
    }
    await generopeliculas.destroy();
    res.send({});
}
exports.show = async (req, res) => {
    if(!req.params.generopeliculaid){
        res.status(400).send({
            message: "El id de la generopeliculas es requerido"
        });
        return;
    }
    const generopeliculas = await db.genero_peliculas.findByPk(req.params.generopeliculaid);
    if (generopeliculas == null) {
        res.status(404).send({ message: "generopeliculas no encontrada" });
        return;
    }
    res.send(generopeliculas);
}
