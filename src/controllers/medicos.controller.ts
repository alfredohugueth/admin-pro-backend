/*
    Imports for req and response
*/

import { Request, Response } from "express";
import { Document, Model } from "mongoose";
import HttpStatusCode from '../enums/HttpStatusCode'


/*
    Import for Collection manipulation
*/

import { Medico } from "../interfaces/medico.interface";
const medico:Model<Medico & Document> = require( '../models/medico.model' );

export class MedicosController { 

    public getMedicos = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'getMedicos'
    
        })
    
    }

    public crearMedicos = async ( req: Request, res: Response ) => {

        const uid = req [ 'uid' ];

        const MedicoCreado = new medico({
            usuario: uid,
            ...req [ 'body' ]
        })

        try {

            const medicoDB = await MedicoCreado.save();

            res.json({
            
                ok :  true,
                medico: medicoDB
        
            })
        
            
        } catch (error) {

            console.log( '------> Error en creación de Medico: ', error );

            res.status( HttpStatusCode [ 'INTERNAL_SERVER_ERROR' ]).json({
                
                ok :  false,
                msg: 'hable con el administrador.'

            })

        }
    
    }

    public borrarMedicos = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'borrarMedicos'
    
        })
    
    }

    public actualizarMedicos = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'actualizarMedicos'
    
        })
    
    }
    
    
    
}