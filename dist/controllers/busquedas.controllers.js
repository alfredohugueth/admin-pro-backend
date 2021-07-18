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
exports.BusquedasController = void 0;
/* Models imports */
const Usuario = require('../models/usuario.model');
const medico = require('../models/medico.model');
const hospital = require('../models/hospital.model');
/* Enums imports */
const HttpStatusCode_1 = __importDefault(require("../enums/HttpStatusCode"));
class BusquedasController {
    constructor() {
        this.getBusqueda = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const nombre = req.params['busqueda'];
            const regex = new RegExp(nombre, 'i'); // Sirve para crear expresiones regulares de los parámetros de búsqueda y que estos sean mas flexibles
            const [usuario_busqueda, medico_busqueda, hospital_busqueda] = yield Promise.all([
                Usuario.find({ nombre: regex }),
                medico.find({ nombre: regex }),
                hospital.find({ nombre: regex })
            ]);
            res.json({
                ok: true,
                usuario_busqueda,
                medico_busqueda,
                hospital_busqueda
            });
        });
        this.getDocumentosColeccion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const tabla = req.params['tabla'];
            const busqueda = req.params['busqueda'];
            const regex = new RegExp(busqueda, 'i');
            let data = [];
            switch (tabla) {
                case 'medicos':
                    data = yield medico.find({ nombre: regex })
                        .populate('usuario', 'nombre img')
                        .populate('hospital', 'nombre img');
                    break;
                case 'hospitales':
                    data = yield hospital.find({ nombre: regex })
                        .populate('usuario', 'nombre img');
                    break;
                case 'usuarios':
                    data = yield Usuario.find({ nombre: regex });
                    break;
                default:
                    res.status(HttpStatusCode_1.default.BAD_REQUEST).json({
                        ok: false,
                        msg: 'La tabla tiene que ser usuarios/medicos/hospitales.'
                    });
                    break;
            }
            res.json({
                ok: true,
                resultados: data
            });
        });
    }
}
exports.BusquedasController = BusquedasController;
