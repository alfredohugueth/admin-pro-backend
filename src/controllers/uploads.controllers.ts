import { Request, Response } from "express";
import { Model } from "mongoose";

/* Interface Imports */

import { Users } from '../interfaces/user.interface'
import { Medico } from "../interfaces/medico.interface";
import { Hospital } from "../interfaces/hospital.interface"


/* Models imports */

const Usuario:Model<Users & Document> = require('../models/usuario.model');
const medico:Model<Medico & Document> = require( '../models/medico.model' );
const hospital:Model<Hospital & Document> = require('../models/hospital.model');


/* Enums imports */

import HttpStatusCode from '../enums/HttpStatusCode'

export class Upload {

    private fileUpload = ( req : Request, res : Response ) => {

        const [tipo, id] = [ req.params [ 'tipo' ], req.params [ 'id' ] ];

        /* Validar Tipo */
        const tiposValidos = [ 'hospitales', 'medicos', 'usuarios'];
        if ( !tiposValidos.includes( tipo ) ) {
            
            res.status(HttpStatusCode.BAD_REQUEST).json({
                
                ok : false,
                msg : 'No es un médico, usuario u hospital (tipo)'

            })
        
        }

        /* Verificar si hay un archivo cargado */
        if (!req.files || Object.keys(req.files).length === 0) {

            return res.status(HttpStatusCode.BAD_REQUEST).json({
                ok : false,
                msg : 'No hay ningún archivo cargado.'
            });
        
        }

        /* Procesas el archivo */


        

        res.json({
            
            ok  : true,
            msg : 'Files Uploads'

        })
    
    }

}