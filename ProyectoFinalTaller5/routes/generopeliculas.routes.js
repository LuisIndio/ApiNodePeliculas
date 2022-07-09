module.exports = app => {
    const controller = require('../controllers/generopeliculas.controller');
    
    let router = require('express').Router();
    const auth = require('../middleware/auth');

    router.get('/generospeliculas',auth, controller.index);
    router.post('/generospeliculas',auth, controller.store);
    router.put('/:generopeliculaid',auth, controller.update);
    router.get('/:generopeliculaid',auth, controller.show);
    router.delete('/:generopeliculaid',auth, controller.delete);
    
    app.use('/api/generospeliculas', router);

}