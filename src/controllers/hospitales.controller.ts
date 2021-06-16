
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

    public getHospitales = async ( req: Request, res: Response ) => {

        const hospitales = await hospital.find()
                                         .populate( 'usuario', 'nombre img' )



        res.json({
            
            ok: true,
            hospitales
    
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

    public actualizarHospital = async ( req: Request, res: Response ) => {
        
        const hospitalID = req.params [ 'id' ];
        const uid = req [ 'uid' ];
        
        try {

            /* Verificamos si existe el hospital */
            const hospitalDB = await hospital.findById( hospitalID );
            if ( !hospitalID ) {
                
                return res.status( HttpStatusCode[ 'NOT_FOUND' ] ).json({
                    
                    ok : false,
                    msg : 'Hospital no encontrado por id',
                    hospitalID
                
                });

            }

            const cambiosHospital = {
                
                ...req[ 'body' ],
                usuario: uid
            
            }

            const hospitalActualizado = await hospital.findByIdAndUpdate( hospitalID, cambiosHospital, { new : true });



            res.json({
                
                ok: true,
                msg: 'Hospital Actualizado',
                hospital : hospitalActualizado
        
            })

        } catch (error) {

            console.log( '------> Error en actualización de hospital: ', error );

            res.status( HttpStatusCode [ 'INTERNAL_SERVER_ERROR' ]).json({
                
                ok :  false,
                msg: 'hable con el administrador.'

            })
            
        }

    
    }
    
    
    
}