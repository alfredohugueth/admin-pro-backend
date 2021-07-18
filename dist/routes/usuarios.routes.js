"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/* Middlewares usuarios */
const validar_campos_middleware_1 = require("../middlewares/validar-campos.middleware");
const validar_jwt_middleware_1 = require("../middlewares/validar-jwt.middleware");
/* Controller usuarios */
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const router = express_1.Router();
/*

    Ruta: /api/usuarios

*/
/* GET /api/usuarios */
router.get('/', validar_jwt_middleware_1.validarJWT, getUsuarios);
/* POST /api/usuarios */
router.post('/', [
    express_validator_1.check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    express_validator_1.check('password', 'La contraseña es obligatoria ').not().isEmpty(),
    express_validator_1.check('email', 'El email es obligatorio ').isEmail(),
    validar_campos_middleware_1.validarCampos
], crearUsuarios);
/* PUT /api/usuarios/:id */
router.put('/:id', [
    validar_jwt_middleware_1.validarJWT,
    validar_jwt_middleware_1.validarAdminRole_o_MismoUsuario,
    express_validator_1.check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    express_validator_1.check('email', 'El email es obligatorio ').isEmail(),
    express_validator_1.check('role', 'El rol es obligatorio ').not().isEmpty(),
    validar_campos_middleware_1.validarCampos
], actualizarUsuario);
/* DELETE /api/usuarios/:id */
router.delete('/:id', [
    validar_jwt_middleware_1.validarJWT,
    validar_jwt_middleware_1.validarAdminRole
], borrarUsuario);
exports.default = router;
