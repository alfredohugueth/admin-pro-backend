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

    public getMedicos = async ( req: Request, res: Response ) => {

        const medicos = await medico.find()
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img')

        res.json({
            
            ok: true,
            medicos
    
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

    public borrarMedicos = async ( req: Request, res: Response ) => {

        const medicoID = req.params [ 'id' ];

        try {
            
            /* Verificamos que exista el medico */
            const medicoDB = await medico.findById( medicoID );
            if ( !medicoDB ) {

                return res.status( HttpStatusCode[ 'NOT_FOUND' ]).json({

                    ok : false,
                    msg : 'Medico no encontrado por id',
                    medicoID

                });

            }

            /* Eliminamos el registro del medico */
            await medico.findByIdAndDelete( medicoID );

            /* Respondemos la petición */
            res.json({
                
                ok : true,
                msg : 'Medico Eliminado',

            })

        } catch (error) {

            console.log( '------> Error en actualización del medico: ', error );

            res.status( HttpStatusCode [ 'INTERNAL_SERVER_ERROR' ]).json({
                
                ok :  false,
                msg: 'hable con el administrador.'

            })
            
        }
    
    }

    public actualizarMedicos = async ( req: Request, res: Response ) => {

        const medicoID = req.params [ 'id' ];
        const uid = req [ 'uid' ];

        try {
            
            /* Verificamos que exista el medico */
            const medicoDB = await medico.findById( medicoID );
            if ( !medicoDB ) {

                return res.status( HttpStatusCode[ 'NOT_FOUND' ]).json({

                    ok : false,
                    msg : 'Medico no encontrado por id',
                    medicoID

                });

            }

            /* Definimos los cambios en el medico */
            const cambiosMedico = {
                
                ...req[ 'body' ],
                usuario : uid

            };

            /* Actualizamos el valor del medico en la base de datos */
            const medicoActualizado = await medico.findByIdAndUpdate( medicoID, cambiosMedico, { new : true });

            /* Respondemos la petición */
            res.json({
                
                ok : true,
                msg : 'Medico Actualizado',
                medico: medicoActualizado

            })

        } catch (error) {

            console.log( '------> Error en actualización del medico: ', error );

            res.status( HttpStatusCode [ 'INTERNAL_SERVER_ERROR' ]).json({
                
                ok :  false,
                msg: 'hable con el administrador.'

            })
            
        }
    
    }


    public getMedicoByID = async ( req: Request, res: Response ) => {

        const id = req.params.id;

        try 
        {        
            const medicoDB = await medico.findById( id )
                                        .populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img')
    
            res.json({
                
                ok: true,
                medicoDB
        
            })
        
        } 
        catch (error) 
        {
            res.status(HttpStatusCode.NOT_FOUND).json({

                ok : false,
                msg : 'Medico no encontrado'
            
            })   
        }

    }
    
    
    
}