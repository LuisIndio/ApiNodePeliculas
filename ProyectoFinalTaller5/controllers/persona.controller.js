const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


exports.index = async (req, res) => {
    const listaPersonas = await db.personas.findAll();
    res.send(listaPersonas);
}
exports.store = async (req, res) => {
    try {
        // Get user input
        const { nombres,password } = req.body;

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);
        
        if(!nombres){
            res.status(400).send({
                message: "El nombre es requerido"
            });
            return;
        }
        
        const user = await db.personas.create({
            nombres,
            password: encryptedPassword,
        });
        // Create token
        const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
        );
        // save user token
        user.token = token;
        
        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}
exports.update = async (req, res) => {
    if(!req.params.personaid){
        res.status(400).send({
            message: "El id de la persona es requerido"
        });
        return;
    }
    const persona = await db.personas.findByPk(req.params.personaid);
    if (persona == null) {
        res.status(404).send({ message: "Persona no encontrada" });
        return;
    }

    if(!req.body.nombres){
        res.status(400).send({
            message: "El nombre es requerido"
        });
        return;
    }
    if(!req.body.apellidos){
        res.status(400).send({
            message: "El apellido es requerido"
        });
        return;
    }
    if(!req.body.edad){
        res.status(400).send({
            message: "La edad es requerido"
        });
        return;
    }
    if(!req.body.fechaNacimiento){
        res.status(400).send({
            message: "La fecha de nacimiento es requerido"
        });
        return;
    }
    if(!req.body.ciudad){
        res.status(400).send({
            message: "La ciudad es requerido"
        });
        return;
    }
    persona.nombres = req.body.nombres;
    persona.apellidos = req.body.apellidos;
    persona.edad = req.body.edad;
    persona.fechaNacimiento = req.body.fechaNacimiento;
    persona.ciudad = req.body.ciudad;
    await persona.save();

    res.send(persona);
}
exports.delete = async (req, res) => {
    if(!req.params.personaid){
        res.status(400).send({
            message: "El id de la persona es requerido"
        });
        return;
    }
    const persona = await db.personas.findByPk(req.params.personaid);
    if (persona == null) {
        res.status(404).send({ message: "Persona no encontrada" });
        return;
    }
    await persona.destroy();
    res.send({});
}
exports.show = async (req, res) => {
    if(!req.params.personaid){
        res.status(400).send({
            message: "El id de la persona es requerido"
        });
        return;
    }
    const persona = await db.personas.findByPk(req.params.personaid);
    if (persona == null) {
        res.status(404).send({ message: "Persona no encontrada" });
        return;
    }
    res.send(persona);
}
