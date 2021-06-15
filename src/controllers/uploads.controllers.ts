import { Request, Response } from "express";
import { Model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import * as Path from "path";
import * as fs from "fs"

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
import fileUpload from "express-fileupload";

/* Helpers imports */
import { actualizarImagen } from "../helpers/actualizar-imagen";

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
        const file = req.files [ 'imagen' ];
        const nombreCortado = file[ 'name' ].split( '.' ); // example.1.3.jpg
        const extensionArchivo = nombreCortado[ nombreCortado.length - 1];

        /* Validar extension */
        const extensionesValidas = [ 'png', 'jpg', 'jpeg', 'gif'];
        if ( !extensionesValidas.includes( extensionArchivo ) ) {

            return res.status(HttpStatusCode.BAD_REQUEST).json({
                ok : false,
                msg : 'No es una extension permitida. '
            });

        }

        /* Generar nombre del archivo */
        const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

        /* Path para guardar la imagen */
        const path = `./uploads/${ tipo }/${ nombreArchivo }`;

        /* Mover archivo */
        file [ 'mv' ] ( path, ( err ) => {
            if ( err ) {
                
                return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    ok: false,
                    msg: 'Error al mover la imagen'
                })

            }
            
            /* Actualizar base de datos */
            actualizarImagen( tipo, id, nombreArchivo);
            
            res.json({
                
                ok  : true,
                msg : 'Archivo Subido',
                nombreArchivo
    
            })

        })


    
    }

    private returnImage = ( req : Request, res : Response ) => {

        const tipo = req.params[ 'tipo' ];
        const foto = req.params[ 'img' ];

        const pathImg = Path.join( __dirname, `../../uploads/${ tipo }/${ foto }`);

        // imagen por defecto
        if ( fs.existsSync( pathImg )) {
            
            res.sendFile ( pathImg );
        
        } else {

            const path_predeterminado = Path.join( __dirname, '../../uploads/noPicture.png')
            res.sendFile ( path_predeterminado );

        }

    }

}