import { NextFunction, Request, Response } from "express";
import { Middleware } from "express-validator/src/base";
import HttpStatusCode from "../enums/HttpStatusCode";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Users } from "../interfaces/user.interface";



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

        console.log(' Verificamos el token ');

        const verify = jwt.verify( token, process.env.JWT_SECRET );
        if ( verify.hasOwnProperty( 'uid' )) {
            console.log( 'Entra al IF ');
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

