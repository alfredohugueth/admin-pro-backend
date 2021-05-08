import { Router } from "express";
import { check } from 'express-validator'

/* Middlewares usuarios */

import { validarCampos } from "../middlewares/validar-campos.middleware";

/* Controller usuarios */

const { getUsuarios, crearUsuarios, actualizarUsuario } = require('../controllers/usuarios.controllers')



const router = Router();

/*

    Ruta: /api/usuarios

*/

/* Rutas con controladores */
router.get( '/', getUsuarios);

router.post( '/', 
    [
        check(  'nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check(  'password', 'La contraseña es obligatoria ' ).not().isEmpty(),
        check(  'email', 'El email es obligatorio ').isEmail(),
        validarCampos
    ],
crearUsuarios);

router.put( '/:id', 
    [
        check(  'nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check(  'email', 'El email es obligatorio ').isEmail(),
        check(  'role', 'El rol es obligatorio ').not().isEmpty(),

        validarCampos  
    ],
    actualizarUsuario
)






export default router;