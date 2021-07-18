"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log("🚀 ~ file: jwt.ts ~ line 17 ~ generarJWT ~ err", err);
                reject('No se pudo generar el Web Token');
            }
            else
                resolve(token);
        });
    });
};
exports.generarJWT = generarJWT;
module.exports = {
    generarJWT: exports.generarJWT
};
