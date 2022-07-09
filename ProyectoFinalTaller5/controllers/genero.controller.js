const db = require("../models");

exports.index = async (req, res) => {
    const listaGeneros = await db.generos.findAll();
    res.send(listaGeneros);
}
exports.store = async (req, res) => {
    if(!req.body.nombres){
        res.status(400).send({
            message: "El nombre es requerido"
        });
        return;
    }
    
    
    const genero = await db.generos.create({
        ...req.body
    });
    res.send(genero);
}
exports.update = async (req, res) => {
    if(!req.params.generoid){
        res.status(400).send({
            message: "El id de la genero es requerido"
        });
        return;
    }
    const genero = await db.generos.findByPk(req.params.generoid);
    if (genero == null) {
        res.status(404).send({ message: "Genero no encontrada" });
        return;
    }

    if(!req.body.nombres){
        res.status(400).send({
            message: "El nombre es requerido"
        });
        return;
    }
    
    genero.nombres = req.body.nombres;
    await genero.save();

    res.send(genero);
}
exports.delete = async (req, res) => {
    if(!req.params.generoid){
        res.status(400).send({
            message: "El id de la genero es requerido"
        });
        return;
    }
    const genero = await db.generos.findByPk(req.params.generoid);
    if (genero == null) {
        res.status(404).send({ message: "Genero no encontrada" });
        return;
    }
    await genero.destroy();
    res.send({});
}
exports.show = async (req, res) => {
    if(!req.params.generoid){
        res.status(400).send({
            message: "El id de la genero es requerido"
        });
        return;
    }
    const genero = await db.generos.findByPk(req.params.generoid);
    if (genero == null) {
        res.status(404).send({ message: "Genero no encontrada" });
        return;
    }
    res.send(genero);
}
exports.peliculasgenero = async (req, res) => {
    if(!req.params.generoid){
        res.status(400).send({
            message: "El id de la genero es requerido"
        });
        return;
    }
    await db.generos.findByPk(req.params.generoid).then(user =>{
        user.getPeliculas({ attributes: ['nombres'] }).then(generos =>{
            res.send(generos);
        })

    });
    
}
