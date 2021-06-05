

/*

Hospitales
ruta: /api/hospitales 
 
 */

import { Router } from "express";
import { check } from 'express-validator'

/* Middlewares Hospitales */

import { validarCampos } from "../middlewares/validar-campos.middleware";
import { validarJWT } from "../middlewares/validar-jwt.middleware";


/* Controller Hospitales */

import { HospitalController } from "../controllers/hospitales.controller";


const router = Router();
const hospitalController = new HospitalController();


/* GET /api/hospitales */

router.get( '/', hospitalController [ 'getHospitales' ]);

/* POST /api/hospitales */

router.post( '/', 
    [
        validarJWT,
        check( 'nombre', 'El nombre del hospital es necesario.' ).not().isEmpty(),
        validarCampos 
    ],
hospitalController [ 'crearHospital']);

/* PUT /api/hospitales/:id */

router.put( '/:id', 
    [],
    hospitalController [ 'actualizarHospital' ]
)

/* DELETE /api/hospitales/:id */

router.delete( '/:id',
    hospitalController [ 'borrarHospital' ]
)





export default router;