module.exports = app => {
    const controller = require('../controllers/genero.controller');
    
    let router = require('express').Router();
    const auth = require('../middleware/auth');

    router.get('/generos',auth, controller.index);
    router.post('/generos',auth, controller.store);
    router.put('/:generoid',auth, controller.update);
    router.get('/:generoid',auth, controller.show);
    router.delete('/:generoid',auth, controller.delete);
    router.get('/:generoid/generos',controller.peliculasgenero)
    

    app.use('/api/generos', router);

}