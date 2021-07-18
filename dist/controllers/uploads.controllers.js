"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const uuid_1 = require("uuid");
const Path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/* Models imports */
const Usuario = require('../models/usuario.model');
const medico = require('../models/medico.model');
const hospital = require('../models/hospital.model');
/* Enums imports */
const HttpStatusCode_1 = __importDefault(require("../enums/HttpStatusCode"));
/* Helpers imports */
const actualizar_imagen_1 = require("../helpers/actualizar-imagen");
class Upload {
    constructor() {
        this.fileUpload = (req, res) => {
            const [tipo, id] = [req.params['tipo'], req.params['id']];
            /* Validar Tipo */
            const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
            if (!tiposValidos.includes(tipo)) {
                res.status(HttpStatusCode_1.default.BAD_REQUEST).json({
                    ok: false,
                    msg: 'No es un médico, usuario u hospital (tipo)'
                });
            }
            /* Verificar si hay un archivo cargado */
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(HttpStatusCode_1.default.BAD_REQUEST).json({
                    ok: false,
                    msg: 'No hay ningún archivo cargado.'
                });
            }
            /* Procesas el archivo */
            const file = req.files['imagen'];
            const nombreCortado = file['name'].split('.'); // example.1.3.jpg
            const extensionArchivo = nombreCortado[nombreCortado.length - 1];
            /* Validar extension */
            const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
            if (!extensionesValidas.includes(extensionArchivo)) {
                return res.status(HttpStatusCode_1.default.BAD_REQUEST).json({
                    ok: false,
                    msg: 'No es una extension permitida. '
                });
            }
            /* Generar nombre del archivo */
            const nombreArchivo = `${uuid_1.v4()}.${extensionArchivo}`;
            /* Path para guardar la imagen */
            const path = `./uploads/${tipo}/${nombreArchivo}`;
            /* Mover archivo */
            file['mv'](path, (err) => {
                if (err) {
                    return res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
                        ok: false,
                        msg: 'Error al mover la imagen'
                    });
                }
                /* Actualizar base de datos */
                actualizar_imagen_1.actualizarImagen(tipo, id, nombreArchivo);
                res.json({
                    ok: true,
                    msg: 'Archivo Subido',
                    nombreArchivo
                });
            });
        };
        this.returnImage = (req, res) => {
            const tipo = req.params['tipo'];
            const foto = req.params['img'];
            const pathImg = Path.join(__dirname, `../../uploads/${tipo}/${foto}`);
            // imagen por defecto
            if (fs.existsSync(pathImg)) {
                res.sendFile(pathImg);
            }
            else {
                const path_predeterminado = Path.join(__dirname, '../../uploads/noPicture.png');
                res.sendFile(path_predeterminado);
            }
        };
    }
}
exports.Upload = Upload;
