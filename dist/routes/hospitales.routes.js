"use strict";
/*

Hospitales
ruta: /api/hospitales
 
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/* Middlewares Hospitales */
const validar_campos_middleware_1 = require("../middlewares/validar-campos.middleware");
const validar_jwt_middleware_1 = require("../middlewares/validar-jwt.middleware");
/* Controller Hospitales */
const hospitales_controller_1 = require("../controllers/hospitales.controller");
const router = express_1.Router();
const hospitalController = new hospitales_controller_1.HospitalController();
/* GET /api/hospitales */
router.get('/', hospitalController['getHospitales']);
/* POST /api/hospitales */
router.post('/', [
    validar_jwt_middleware_1.validarJWT,
    express_validator_1.check('nombre', 'El nombre del hospital es necesario.').not().isEmpty(),
    validar_campos_middleware_1.validarCampos
], hospitalController['crearHospital']);
/* PUT /api/hospitales/:id */
router.put('/:id', [
    validar_jwt_middleware_1.validarJWT
], hospitalController['actualizarHospital']);
/* DELETE /api/hospitales/:id */
router.delete('/:id', validar_jwt_middleware_1.validarJWT, hospitalController['borrarHospital']);
exports.default = router;
