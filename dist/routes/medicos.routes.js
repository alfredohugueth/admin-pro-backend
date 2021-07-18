"use strict";
/*

Médicos
ruta: /api/medicos
 
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/* Middlewares Medicos */
const validar_campos_middleware_1 = require("../middlewares/validar-campos.middleware");
const validar_jwt_middleware_1 = require("../middlewares/validar-jwt.middleware");
/* Controller Medicos */
const medicos_controller_1 = require("../controllers/medicos.controller");
const router = express_1.Router();
const medicosController = new medicos_controller_1.MedicosController;
/* GET /api/medicos */
router.get('/', medicosController['getMedicos']);
/* POST /api/medicos */
router.post('/', [
    validar_jwt_middleware_1.validarJWT,
    express_validator_1.check('nombre', 'El nombre del Medico es necesario.').not().isEmpty(),
    express_validator_1.check('hospital', 'El ID del hospital afiliado debe ser valido').isMongoId(),
    validar_campos_middleware_1.validarCampos
], medicosController['crearMedicos']);
/* PUT /api/medicos/:id */
router.put('/:id', [
    validar_jwt_middleware_1.validarJWT,
    express_validator_1.check('nombre', 'El nombre del Medico es necesario.').not().isEmpty(),
    express_validator_1.check('hospital', 'El ID del hospital afiliado debe ser valido').isMongoId(),
    validar_campos_middleware_1.validarCampos
], medicosController['actualizarMedicos']);
/* DELETE /api/medicos/:id */
router.delete('/:id', validar_jwt_middleware_1.validarJWT, medicosController['borrarMedicos']);
router.get('/:id', validar_jwt_middleware_1.validarJWT, medicosController['getMedicoByID']);
exports.default = router;
