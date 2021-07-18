import { NextFunction, Request, Response } from "express";
import { Middleware } from "express-validator/src/base";
import HttpStatusCode from "../enums/HttpStatusCode";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Users } from "../interfaces/user.interface";
import { Model } from "mongoose";

const Usuario:Model<Users & Document> = require('../models/usuario.model');



export const validarJWT : Middleware = ( req : Request, res : Response, next : NextFunction) => {

    console.log( 'Leemos el token recibido ');

    /* Leer el Token */
    const token = req.header( 'x-token' );

    if ( !token ) {

        return res.status( HttpStatusCode.UNAUTHORIZED ).json({

            ok  :  false,
            msg : 'No hay token en la petición.'
        
        })

    }

    /* Verificar JWT */

    try {


        const verify = jwt.verify( token, process.env.JWT_SECRET );
        if ( verify.hasOwnProperty( 'uid' )) {
            req[ 'uid' ] =  verify[ 'uid' ];
            next();

        } else {

            res.status( HttpStatusCode.ALREADY_REPORTED ).json({

                ok : true,
                msg : 'Token valido por el momento',
                token
                
            })
        }

    } catch (error) {
        return res.status( HttpStatusCode.UNAUTHORIZED ).json({

            ok  :  false,
            msg : 'Token no válido.'

        })

    }

}

export const validarAdminRole : Middleware = async ( req : Request, res : Response, next : NextFunction) =>
{
    const uid = req['uid'];

    try 
    {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB )
        {
            
            return res.status( HttpStatusCode.NOT_FOUND ).json({

                ok : false,
                msg : 'No existe usuario con este identificador'

            })

        }

        if ( usuarioDB.role !== 'ADMIN_ROLE' )
        {

            return res.status( HttpStatusCode.UNAUTHORIZED ).json({

                ok : false,
                msg : 'No tiene privilegios para realizar esta acción'

            })

        }

        next();

    } 
    catch (error) 
    {

        res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({

            ok : false,
            msg : 'Hable con el administrador'

        })
    
    }
}

export const validarAdminRole_o_MismoUsuario : Middleware = async ( req : Request, res : Response, next : NextFunction) =>
{
    
    const uid = req['uid'];
    const id = req.params.id;


    try 
    {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB )
        {
            
            return res.status( HttpStatusCode.NOT_FOUND ).json({

                ok : false,
                msg : 'No existe usuario con este identificador'

            })

        }

        if ( usuarioDB.role === 'ADMIN_ROLE' || uid === id )
        {

            next();
            
        }
        else
        {
            
            return res.status( HttpStatusCode.UNAUTHORIZED ).json({
    
                ok : false,
                msg : 'No tiene privilegios para realizar esta acción'
    
            })

        }


    } 
    catch (error) 
    {

        res.status( HttpStatusCode.INTERNAL_SERVER_ERROR ).json({

            ok : false,
            msg : 'Hable con el administrador'

        })
    
    }
}
