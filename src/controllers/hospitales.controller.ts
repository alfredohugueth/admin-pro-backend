
/*
    Imports for req and response
*/

import { Request, Response } from "express";
import { Model } from "mongoose";
import HttpStatusCode from '../enums/HttpStatusCode'


/*
    Import for Collection manipulation
*/

import { Hospital } from "../interfaces/hospital.interface"
const hospital:Model<Hospital & Document> = require('../models/hospital.model');

export class HospitalController { 

    public getHospitales = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'getHospitales'
    
        })
    
    }

    public crearHospital = async ( req: Request, res: Response ) => {

        const uid = req [ 'uid' ];

        const HospitalCreado = new hospital({
            
            usuario: uid,
            ...req [ 'body' ]
        
        });

        try {

            const hospitalDB = await HospitalCreado.save();

            res.json({
            
                ok :  true,
                hospital: hospitalDB
        
            })
        
            
        } catch (error) {
            
            console.log( '------> Error en creación de hospital: ', error );

            res.status( HttpStatusCode [ 'INTERNAL_SERVER_ERROR' ]).json({
                
                ok :  false,
                msg: 'hable con el administrador.'

            })

        }
    
    }

    public borrarHospital = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'borrarHospital'
    
        })
    
    }

    public actualizarHospital = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'actualizarHospital'
    
        })
    
    }
    
    
    
}