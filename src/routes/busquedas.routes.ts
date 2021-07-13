import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.middleware";

/*
    
    ruta: api/todo/:busqueda

*/

/* Controller */

import { BusquedasController } from "../controllers/busquedas.controllers"

/* Muddlewares */
import { validarJWT } from "../middlewares/validar-jwt.middleware";


const router = Router();
const busquedasController = new BusquedasController();

router.get( '/:busqueda', 
        [
            validarJWT
        ], 
        busquedasController [ 'getBusqueda' ]);

router.get('/coleccion/:tabla/:busqueda', validarJWT, busquedasController [ 'getDocumentosColeccion' ])
// api/todo/...



export default router;

