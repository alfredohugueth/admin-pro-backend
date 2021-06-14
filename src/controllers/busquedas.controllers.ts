
import { Request, Response } from "express";
import { Model } from "mongoose";

/* Interface Imports */

import { Users, UsersModel } from '../interfaces/user.interface'
import { Medico } from "../interfaces/medico.interface";
import { Hospital } from "../interfaces/hospital.interface"


/* Models imports */

const Usuario:Model<Users & Document> = require('../models/usuario.model');
const medico:Model<Medico & Document> = require( '../models/medico.model' );
const hospital:Model<Hospital & Document> = require('../models/hospital.model');


/* Enums imports */

import HttpStatusCode from '../enums/HttpStatusCode'

export class BusquedasController {

    private getBusqueda = async ( req: Request, res: Response) => {

        const nombre = req.params [ 'busqueda' ];

        const regex = new RegExp( nombre, 'i'); // Sirve para crear expresiones regulares de los parámetros de búsqueda y que estos sean mas flexibles


        const [ usuario_busqueda, medico_busqueda, hospital_busqueda ] = await Promise.all([
            
                Usuario.find( { nombre: regex } ),
                medico.find( { nombre: regex}),
                hospital.find( { nombre: regex})
            
            ]);


        res.json({
            
            ok: true,
            usuario_busqueda,
            medico_busqueda,
            hospital_busqueda

        })

    }

    private getDocumentosColeccion = async ( req : Request, res : Response ) => {

        const tabla = req.params [ 'tabla' ];
        const busqueda = req.params [ 'busqueda' ];
        const regex = new RegExp ( busqueda, 'i');
        let data = [];

        switch ( tabla ) {
            
            case 'medicos':

                data = await medico.find( { nombre : regex} )
                                    .populate( 'usuario', 'nombre img')
                                    .populate( 'hospital', 'nombre img')

            break;

            case 'hospitales':

                data = await hospital.find( { nombre : regex} )
                                     .populate( 'usuario', 'nombre img');
            
            break;

            case 'usuarios':

                data = await Usuario.find( { nombre : regex} );
            
            break;

            default:
                
                res.status(HttpStatusCode.BAD_REQUEST).json( {
                    ok : false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales.'
                } )
            
            break;

            
        }

        res.json({
                    
            ok : true,
            resultados: data

        })

    } 

}
