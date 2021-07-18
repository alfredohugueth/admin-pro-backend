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
exports.HospitalController = void 0;
const HttpStatusCode_1 = __importDefault(require("../enums/HttpStatusCode"));
const hospital = require('../models/hospital.model');
class HospitalController {
    constructor() {
        this.getHospitales = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const hospitales = yield hospital.find()
                .populate('usuario', 'nombre img');
            res.json({
                ok: true,
                hospitales
            });
        });
        this.crearHospital = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req['uid'];
            const HospitalCreado = new hospital(Object.assign({ usuario: uid }, req['body']));
            try {
                const hospitalDB = yield HospitalCreado.save();
                res.json({
                    ok: true,
                    hospital: hospitalDB
                });
            }
            catch (error) {
                console.log('------> Error en creación de hospital: ', error);
                res.status(HttpStatusCode_1.default['INTERNAL_SERVER_ERROR']).json({
                    ok: false,
                    msg: 'hable con el administrador.'
                });
            }
        });
        this.borrarHospital = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const hospitalID = req.params['id'];
            try {
                /* Verificamos si existe el hospital */
                const hospitalDB = yield hospital.findById(hospitalID);
                if (!hospitalID) {
                    return res.status(HttpStatusCode_1.default['NOT_FOUND']).json({
                        ok: false,
                        msg: 'Hospital no encontrado por id',
                        hospitalID
                    });
                }
                yield hospital.findByIdAndDelete(hospitalID);
                res.json({
                    ok: true,
                    msg: 'Hospital eliminado',
                });
            }
            catch (error) {
                console.log('------> Error en eliminación de hospital: ', error);
                res.status(HttpStatusCode_1.default['INTERNAL_SERVER_ERROR']).json({
                    ok: false,
                    msg: 'hable con el administrador.'
                });
            }
        });
        this.actualizarHospital = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const hospitalID = req.params['id'];
            const uid = req['uid'];
            try {
                /* Verificamos si existe el hospital */
                const hospitalDB = yield hospital.findById(hospitalID);
                if (!hospitalID) {
                    return res.status(HttpStatusCode_1.default['NOT_FOUND']).json({
                        ok: false,
                        msg: 'Hospital no encontrado por id',
                        hospitalID
                    });
                }
                const cambiosHospital = Object.assign(Object.assign({}, req['body']), { usuario: uid });
                const hospitalActualizado = yield hospital.findByIdAndUpdate(hospitalID, cambiosHospital, { new: true });
                res.json({
                    ok: true,
                    msg: 'Hospital Actualizado',
                    hospital: hospitalActualizado
                });
            }
            catch (error) {
                console.log('------> Error en actualización de hospital: ', error);
                res.status(HttpStatusCode_1.default['INTERNAL_SERVER_ERROR']).json({
                    ok: false,
                    msg: 'hable con el administrador.'
                });
            }
        });
    }
}
exports.HospitalController = HospitalController;
