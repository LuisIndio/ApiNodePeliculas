module.exports = app => {
    const controller = require('../controllers/pelicula.controller');
    
    let router = require('express').Router();
    const auth = require('../middleware/auth');

    router.get('/peliculas',auth, controller.index);
    router.post('/peliculas',auth, controller.store);
    router.put('/:peliculaid',auth, controller.update);
    router.get('/:peliculaid',auth, controller.show);
    router.delete('/:peliculaid',auth, controller.delete);

    app.use('/api/peliculas', router);

}