import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.middleware";

/* Controller login */

const { login, googleSignIn } = require ('../controllers/auth.controllers')

const router = Router();

/*

    Ruta: api/login

*/

router.post ( '/',

    [

        check( 'email', 'El email es obligatorio').isEmail(),
        check( 'password', "El campo password es obligatorio").not().isEmpty(),
        validarCampos
        
    ],
    login
    
)

router.post ( '/google',

    [

        check( 'token', 'El token es obligatorio').not().isEmpty(),
        validarCampos
        
    ],
    googleSignIn
    
)
export default router;

