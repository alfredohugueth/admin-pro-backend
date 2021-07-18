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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
/* GET /api/usuarios */
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    console.log(desde);
    // const usuarios = await Usuario
    //                               .find(  {}, 'nombre email role google' )
    //                               .skip( desde )
    //                               .limit( 5 )
    // const total = await Usuario.count()
    const [usuarios, total] = yield Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ]);
    res.json({
        "ok": true,
        usuarios,
        uid: req['uid'],
        total
    });
});
/* POST /api/usuarios */
const crearUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🚀 ~ file: usuarios.controllers.ts ~ line 13 ~ crearUsuarios ~ req", req['body']);
    const { email, password, nombre } = req['body'];
    /* Intentamos realizar el procedimiento de guardado de usuario en la base de datos */
    try {
        const existeEmail = yield Usuario.findOne({ email });
        if (existeEmail) {
            return res['status'](500).json({
                ok: false,
                msg: 'El correo ya está registrado. '
            });
        }
        const usuario = new Usuario(req['body']);
        /* Encriptar contraseña */
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        /* Save user */
        yield usuario.save();
        /* Generamos el JWT */
        const token = yield jwt_1.generarJWT(usuario.id);
        res.json({
            "ok": true,
            usuario,
            token
        });
    }
    catch (error) {
        console.log("🚀 ~ file: usuarios.controllers.ts ~ line 35 ~ crearUsuarios ~ error", error);
        res.status(500).json({
            "ok": false,
            "msg": 'Error inesperado... revisar logs'
        });
    }
});
/* PUT /api/usuarios/:id */
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* TODO: Validar token y comprobar si es el usuario correcto */
    const uid = req.params.id;
    const {} = req['body'];
    try {
        const usuarioDB = yield Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(HttpStatusCode_1.default.NOT_FOUND).json({
                ok: false,
                msg: "No existe un usuario con ese id."
            });
        }
        /* Actualizaciones */
        const _a = req['body'], { password, google, email } = _a, campos = __rest(_a, ["password", "google", "email"]);
        if (usuarioDB.email !== email) {
            const existeEmail = yield Usuario.findOne({ email });
            if (existeEmail)
                return res.status(HttpStatusCode_1.default.BAD_REQUEST).json({
                    ok: false,
                    msg: ' Ya existe un usuario con este email '
                });
        }
        if (!usuarioDB.google) {
            campos.email = email;
        }
        else if (usuarioDB.email !== email) {
            return res.status(HttpStatusCode_1.default.BAD_REQUEST).json({
                ok: false,
                msg: 'Usuarios de google no pueden cambiar su correo'
            });
        }
        const usuarioActualizado = yield Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuarioActualizado
        });
    }
    catch (error) {
        console.log("🚀 ~ file: usuarios.controllers.ts ~ line 85 ~ actualizarUsuario ~ error", error);
        res.statusCode = HttpStatusCode_1.default.INTERNAL_SERVER_ERROR;
        res.json({
            ok: false,
            msg: "Error Inesperado."
        });
    }
});
/* DELETE /api/usuarios/:id */
const borrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    try {
        const usuarioDB = yield Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(HttpStatusCode_1.default.NOT_FOUND).json({
                ok: false,
                msg: "No existe un usuario con ese id."
            });
        }
        yield Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: "Usuario Eliminado"
        });
    }
    catch (error) {
        console.log(error);
        res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
};
