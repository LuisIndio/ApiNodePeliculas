const db = require("../models");

exports.index = async (req, res) => {
    const listaPeliculas = await db.peliculas.findAll();
    res.send(listaPeliculas);
}

exports.store = async (req, res) => {
    if(!req.body.nombres){
        res.status(400).send({
            message: "El nombre es requerido"
        });
        return;
    }
    if(!req.body.codigo){
        res.status(400).send({
            message: "El apellido es requerido"
        });
        return;
    }
    if(!req.body.descripcion){
        res.status(400).send({
            message: "La edad es requerido"
        });
        return;
    }
    
    const pelicula = await db.peliculas.create({
        ...req.body
    });

    res.send(pelicula);
}
exports.update = async (req, res) => {
    if(!req.params.peliculaid){
        res.status(400).send({
            message: "El id de la pelicula es requerido"
        });
        return;
    }
    const pelicula = await db.peliculas.findByPk(req.params.peliculaid);
    if (pelicula == null) {
        res.status(404).send({ message: "Pelicula no encontrada" });
        return;
    }

    if(!req.body.nombres){
        res.status(400).send({
            message: "El nombre es requerido"
        });
        return;
    }
    if(!req.body.codigo){
        res.status(400).send({
            message: "El codigo es requerido"
        });
        return;
    }
    if(!req.body.descripcion){
        res.status(400).send({
            message: "La descripcion es requerido"
        });
        return;
    }
    
    pelicula.nombres = req.body.nombres;
    pelicula.codigo = req.body.codigo;
    pelicula.descripcion = req.body.descripcion;
    await pelicula.save();

    res.send(pelicula);
}
exports.delete = async (req, res) => {
    if(!req.params.peliculaid){
        res.status(400).send({
            message: "El id de la pelicula es requerido"
        });
        return;
    }
    const pelicula = await db.peliculas.findByPk(req.params.peliculaid);
    if (pelicula == null) {
        res.status(404).send({ message: "Pelicula no encontrada" });
        return;
    }
    await pelicula.destroy();
    res.send({});
}
exports.show = async (req, res) => {
    if(!req.params.peliculaid){
        res.status(400).send({
            message: "El id de la pelicula es requerido"
        });
        return;
    }
    const pelicula = await db.peliculas.findByPk(req.params.peliculaid);
    if (pelicula == null) {
        res.status(404).send({ message: "Pelicula no encontrada" });
        return;
    }
    res.send(pelicula);
}
