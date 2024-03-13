/*
    event routes
    /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const  { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const isDate = require('../helpers/isDate');

const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use( validarJWT );

// obtener eventos
router.get(
    '/',
    [
        check('tittle', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'fecha de incio es obligatoria').custom( isDate ),
        check('end', 'fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ], 
    validarJWT, getEventos );


// crear un nuevo eventos
router.post('/', validarJWT, crearEvento );


// actualizar eventos
router.put('/:id', validarJWT, actualizarEvento );


// borrrar eventos
router.delete('/:id', validarJWT, eliminarEvento );


module.exports = router;