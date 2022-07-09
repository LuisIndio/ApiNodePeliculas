let express = require('express');
let cors = require('cors');
let app = express()
let http = require('http').createServer(app);
require("dotenv").config(); 

const {upload} = require('./controllers/upload.controller')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.post('/imagenes' ,upload.single('portada'),(req, res) => {
  
    console.log(req.body,req.file)
});


const db = require("./models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
db.sequelize.sync().then(() => {
    console.log("db resync");
});


require("./routes/prueba.routes")(app);
require("./routes/persona.routes")(app);
require("./routes/pelicula.routes")(app);
require("./routes/genero.routes")(app);
require("./routes/generopeliculas.routes")(app);


const personaRouta = require('./routes/persona.routes');
const peliculaRouta = require('./routes/pelicula.routes');
const generoRouta = require('./routes/genero.routes');
const generopeliculasRouta = require('./routes/generopeliculas.routes');


const { DB } = require('./config/db.config');


app.use('api/', personaRouta);
app.use('api/peliculas/', peliculaRouta);
app.use('api/generos/', generoRouta);
app.use('api/generospeliculas/', generopeliculasRouta);
app.use('/imagenes', express.static(__dirname+'/imagenes'));



// Register
app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { nombres, password } = req.body;

    // Validate user input
    if (!(nombres && password )) {
      res.status(400).send("All input is required");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await db.personas.create({
      nombres,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id},
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
  // Our register logic ends here
});
  
  // Login
  app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { nombres, password } = req.body;
  
      // Validate user input
      if (!(nombres && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await db.personas.findOne({
        where: { nombres: nombres },
      });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id},
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

http.listen(3000, '0.0.0.0',() => {
    console.log('listening on *:3000');
});
