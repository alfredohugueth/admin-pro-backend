"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/*
    
    ruta: api/todo/:busqueda

*/
/* Controller */
const busquedas_controllers_1 = require("../controllers/busquedas.controllers");
/* Muddlewares */
const validar_jwt_middleware_1 = require("../middlewares/validar-jwt.middleware");
const router = express_1.Router();
const busquedasController = new busquedas_controllers_1.BusquedasController();
router.get('/:busqueda', [
    validar_jwt_middleware_1.validarJWT
], busquedasController['getBusqueda']);
router.get('/coleccion/:tabla/:busqueda', validar_jwt_middleware_1.validarJWT, busquedasController['getDocumentosColeccion']);
// api/todo/...
exports.default = router;
