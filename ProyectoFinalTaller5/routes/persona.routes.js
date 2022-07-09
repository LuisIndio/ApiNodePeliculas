module.exports = app => {
    const controller = require('../controllers/persona.controller');
    
    let router = require('express').Router();
    const auth = require('../middleware/auth');

    router.get('/',auth, controller.index);
    router.post('/', controller.store);
    router.put('/:personaid', controller.update);
    router.get('/:personaid', controller.show);
    router.delete('/:personaid', controller.delete);

    app.use('/api/personas', router);
}