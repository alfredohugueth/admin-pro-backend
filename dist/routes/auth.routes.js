"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_middleware_1 = require("../middlewares/validar-campos.middleware");
const validar_jwt_middleware_1 = require("../middlewares/validar-jwt.middleware");
/* Controller login */
const { login, googleSignIn, renewToken } = require('../controllers/auth.controllers');
const router = express_1.Router();
/*

    Ruta: api/login

*/
router.post('/', [
    express_validator_1.check('email', 'El email es obligatorio').isEmail(),
    express_validator_1.check('password', "El campo password es obligatorio").not().isEmpty(),
    validar_campos_middleware_1.validarCampos
], login);
router.post('/google', [
    express_validator_1.check('token', 'El token es obligatorio').not().isEmpty(),
    validar_campos_middleware_1.validarCampos
], googleSignIn);
router.get('/renew', validar_jwt_middleware_1.validarJWT, renewToken);
exports.default = router;
