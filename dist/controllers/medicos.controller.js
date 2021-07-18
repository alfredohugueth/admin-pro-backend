"use strict";
/*
    Imports for req and response
*/
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
exports.MedicosController = void 0;
const HttpStatusCode_1 = __importDefault(require("../enums/HttpStatusCode"));
const medico = require('../models/medico.model');
class MedicosController {
    constructor() {
        this.getMedicos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const medicos = yield medico.find()
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            res.json({
                ok: true,
                medicos
            });
        });
        this.crearMedicos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req['uid'];
            const MedicoCreado = new medico(Object.assign({ usuario: uid }, req['body']));
            try {
                const medicoDB = yield MedicoCreado.save();
                res.json({
                    ok: true,
                    medico: medicoDB
                });
            }
            catch (error) {
                console.log('------> Error en creación de Medico: ', error);
                res.status(HttpStatusCode_1.default['INTERNAL_SERVER_ERROR']).json({
                    ok: false,
                    msg: 'hable con el administrador.'
                });
            }
        });
        this.borrarMedicos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const medicoID = req.params['id'];
            try {
                /* Verificamos que exista el medico */
                const medicoDB = yield medico.findById(medicoID);
                if (!medicoDB) {
                    return res.status(HttpStatusCode_1.default['NOT_FOUND']).json({
                        ok: false,
                        msg: 'Medico no encontrado por id',
                        medicoID
                    });
                }
                /* Eliminamos el registro del medico */
                yield medico.findByIdAndDelete(medicoID);
                /* Respondemos la petición */
                res.json({
                    ok: true,
                    msg: 'Medico Eliminado',
                });
            }
            catch (error) {
                console.log('------> Error en actualización del medico: ', error);
                res.status(HttpStatusCode_1.default['INTERNAL_SERVER_ERROR']).json({
                    ok: false,
                    msg: 'hable con el administrador.'
                });
            }
        });
        this.actualizarMedicos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const medicoID = req.params['id'];
            const uid = req['uid'];
            try {
                /* Verificamos que exista el medico */
                const medicoDB = yield medico.findById(medicoID);
                if (!medicoDB) {
                    return res.status(HttpStatusCode_1.default['NOT_FOUND']).json({
                        ok: false,
                        msg: 'Medico no encontrado por id',
                        medicoID
                    });
                }
                /* Definimos los cambios en el medico */
                const cambiosMedico = Object.assign(Object.assign({}, req['body']), { usuario: uid });
                /* Actualizamos el valor del medico en la base de datos */
                const medicoActualizado = yield medico.findByIdAndUpdate(medicoID, cambiosMedico, { new: true });
                /* Respondemos la petición */
                res.json({
                    ok: true,
                    msg: 'Medico Actualizado',
                    medico: medicoActualizado
                });
            }
            catch (error) {
                console.log('------> Error en actualización del medico: ', error);
                res.status(HttpStatusCode_1.default['INTERNAL_SERVER_ERROR']).json({
                    ok: false,
                    msg: 'hable con el administrador.'
                });
            }
        });
        this.getMedicoByID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const medicoDB = yield medico.findById(id)
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                res.json({
                    ok: true,
                    medicoDB
                });
            }
            catch (error) {
                res.json({
                    ok: false,
                    msg: 'Medico no encontrado'
                });
            }
        });
    }
}
exports.MedicosController = MedicosController;
