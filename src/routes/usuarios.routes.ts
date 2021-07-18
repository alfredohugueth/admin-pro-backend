import { Router } from "express";
import { check } from 'express-validator'

/* Middlewares usuarios */

import { validarCampos } from "../middlewares/validar-campos.middleware";
import { validarAdminRole, validarAdminRole_o_MismoUsuario, validarJWT } from "../middlewares/validar-jwt.middleware";

/* Controller usuarios */

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers')



const router = Router();

/*

    Ruta: /api/usuarios

*/

/* GET /api/usuarios */

router.get( '/', validarJWT ,getUsuarios);

/* POST /api/usuarios */

router.post( '/', 
    [
        
        check(  'nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check(  'password', 'La contraseña es obligatoria ' ).not().isEmpty(),
        check(  'email', 'El email es obligatorio ').isEmail(),

        validarCampos
    ],
crearUsuarios);

/* PUT /api/usuarios/:id */

router.put( '/:id', 
    [
        
        validarJWT,
        validarAdminRole_o_MismoUsuario,
        check(  'nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check(  'email',  'El email es obligatorio ') .isEmail(),
        check(  'role',   'El rol es obligatorio ')   .not().isEmpty(),

        validarCampos  

    ],
    actualizarUsuario
)

/* DELETE /api/usuarios/:id */

router.delete( '/:id',
    [
        
        validarJWT,
        validarAdminRole

    ],
    borrarUsuario

)





export default router;