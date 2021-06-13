

/*

Médicos
ruta: /api/medicos 
 
 */

import { Router } from "express";
import { check } from 'express-validator'

/* Middlewares Medicos */

import { validarCampos } from "../middlewares/validar-campos.middleware";
import { validarJWT } from "../middlewares/validar-jwt.middleware";


/* Controller Medicos */

import { MedicosController } from "../controllers/medicos.controller"


const router = Router();
const medicosController = new MedicosController;


/* GET /api/medicos */

router.get( '/', medicosController [ 'getMedicos' ]);

/* POST /api/medicos */

router.post( '/', 
    [
        validarJWT,
        check( 'nombre', 'El nombre del Medico es necesario.' ).not().isEmpty(),
        check( 'hospital', 'El ID del hospital afiliado debe ser valido' ).isMongoId(),
        validarCampos  
    ],
medicosController [ 'crearMedicos']);

/* PUT /api/medicos/:id */

router.put( '/:id', 
    [],
    medicosController [ 'actualizarMedicos' ]
)

/* DELETE /api/medicos/:id */

router.delete( '/:id',
    medicosController [ 'borrarMedicos' ]
)





export default router;