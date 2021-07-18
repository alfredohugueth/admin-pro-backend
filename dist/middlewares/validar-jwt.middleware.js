"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarAdminRole_o_MismoUsuario = exports.validarAdminRole = exports.validarJWT = void 0;
const HttpStatusCode_1 = __importDefault(require("../enums/HttpStatusCode"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario = require('../models/usuario.model');
const validarJWT = (req, res, next) => {
    console.log('Leemos el token recibido ');
    /* Leer el Token */
    const token = req.header('x-token');
    if (!token) {
        return res.status(HttpStatusCode_1.default.UNAUTHORIZED).json({
            ok: false,
            msg: 'No hay token en la petición.'
        });
    }
    /* Verificar JWT */
    try {
        const verify = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (verify.hasOwnProperty('uid')) {
            req['uid'] = verify['uid'];
            next();
        }
        else {
            res.status(HttpStatusCode_1.default.ALREADY_REPORTED).json({
                ok: true,
                msg: 'Token valido por el momento',
                token
            });
        }
    }
    catch (error) {
        return res.status(HttpStatusCode_1.default.UNAUTHORIZED).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }
};
exports.validarJWT = validarJWT;
const validarAdminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req['uid'];
    try {
        const usuarioDB = yield Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(HttpStatusCode_1.default.NOT_FOUND).json({
                ok: false,
                msg: 'No existe usuario con este identificador'
            });
        }
        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(HttpStatusCode_1.default.UNAUTHORIZED).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción'
            });
        }
        next();
    }
    catch (error) {
        res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.validarAdminRole = validarAdminRole;
const validarAdminRole_o_MismoUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req['uid'];
    const id = req.params.id;
    try {
        const usuarioDB = yield Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(HttpStatusCode_1.default.NOT_FOUND).json({
                ok: false,
                msg: 'No existe usuario con este identificador'
            });
        }
        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        }
        else {
            return res.status(HttpStatusCode_1.default.UNAUTHORIZED).json({
                ok: false,
                msg: 'No tiene privilegios para realizar esta acción'
            });
        }
    }
    catch (error) {
        res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.validarAdminRole_o_MismoUsuario = validarAdminRole_o_MismoUsuario;
