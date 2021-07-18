"use strict";
/*

    ruta: /api/upload/
 
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/* MiddleWares */
const validar_jwt_middleware_1 = require("../middlewares/validar-jwt.middleware");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
/* Controller */
const uploads_controllers_1 = require("../controllers/uploads.controllers");
/* Start of the code */
const router = express_1.Router();
const uploadController = new uploads_controllers_1.Upload();
router.use(express_fileupload_1.default());
router.put('/:tipo/:id', validar_jwt_middleware_1.validarJWT, uploadController['fileUpload']);
router.get('/:tipo/:img', uploadController['returnImage']);
exports.default = router;
