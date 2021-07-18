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
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarImagen = void 0;
const fs = require('fs');
const Usuarios = require('../models/usuario.model');
const medicos = require('../models/medico.model');
const hospitales = require('../models/hospital.model');
const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
const actualizarImagen = (tipo, id, nombreArchivo) => __awaiter(void 0, void 0, void 0, function* () {
    switch (tipo) {
        case 'medicos':
            const medico = yield medicos.findById(id);
            if (!medico) {
                console.log('----> El medico no existe ');
                return false;
            }
            /* Borramos la imagen anterior del usuario en caso de que tenga */
            const pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            /* Actualizamos la foto del usuario */
            medico.img = nombreArchivo;
            yield medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = yield hospitales.findById(id);
            if (!hospital) {
                console.log('----> El hospital no existe ');
                return false;
            }
            /* Borramos la imagen anterior del usuario en caso de que tenga */
            const pathHospital = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathHospital);
            /* Actualizamos la foto del usuario */
            hospital.img = nombreArchivo;
            yield hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = yield Usuarios.findById(id);
            if (!usuario) {
                console.log('----> El usuario no existe ');
                return false;
            }
            /* Borramos la imagen anterior del usuario en caso de que tenga */
            const pathUsuario = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathUsuario);
            /* Actualizamos la foto del usuario */
            usuario.img = nombreArchivo;
            yield usuario.save();
            return true;
            break;
    }
});
exports.actualizarImagen = actualizarImagen;
