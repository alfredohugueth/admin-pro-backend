"use strict";
/* API Imports */
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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/* Models imports */
const Usuario = require('../models/usuario.model');
/* Enums imports */
const HttpStatusCode_1 = __importDefault(require("../enums/HttpStatusCode"));
/* Helpers imports */
const jwt_1 = require("../helpers/jwt");
const google_verify_1 = require("../helpers/google-verify");
const menu_frontend_1 = require("../helpers/menu-frontend");
/* GET /api/auth */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuarioDB = yield Usuario.findOne({ email });
        /* Verificar email */
        if (!usuarioDB) {
            return res.status(HttpStatusCode_1.default.NOT_FOUND).json({
                ok: false,
                msg: "No existe un usuario con este email."
            });
        }
        /* Verificar password */
        const validPassword = bcryptjs_1.default.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(HttpStatusCode_1.default.BAD_REQUEST).json({
                ok: false,
                msg: "Contraseña no valida."
            });
        }
        /* Generar el TOKEN JWT */
        const token = yield jwt_1.generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            token,
            menu: menu_frontend_1.getMenuFrontEnd(usuarioDB.role)
        });
    }
    catch (error) {
        console.log("🚀 ~ file: usuarios.controllers.ts ~ line 35 ~ crearUsuarios ~ error", error);
        res.status(500).json({
            "ok": false,
            "msg": ' Hable con el administrador '
        });
    }
});
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const googleToken = req.body['token'];
    try {
        const { name, email, picture } = yield google_verify_1.googleVerify(googleToken);
        /* Verificamos si el usuario existe */
        const usuarioDB = yield Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }
        else {
            /* El usuario existe */
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }
        /* Guardar en DB */
        yield usuario.save();
        /* Generamos JWT */
        const token = yield jwt_1.generarJWT(usuario.id);
        res.json({
            ok: true,
            token,
            menu: menu_frontend_1.getMenuFrontEnd(usuario.role)
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
});
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Se recibe la petición para verificar el JWT ');
    const uid2 = req['uid'];
    /* Generamos JWT */
    const token = yield jwt_1.generarJWT(uid2);
    /* Obtener el usuario por uid */
    const usuarioDB = yield Usuario.findById(uid2);
    /* Si se encuentra el usuario, se devuelve*/
    if (usuarioDB) {
        res.json({
            ok: true,
            token,
            usuario: usuarioDB,
            menu: menu_frontend_1.getMenuFrontEnd(usuarioDB.role)
        });
    }
    else {
        res.json({
            ok: true,
            token,
            msg: 'Usuario no encontrado'
        });
    }
});
module.exports = {
    login,
    googleSignIn,
    renewToken
};
