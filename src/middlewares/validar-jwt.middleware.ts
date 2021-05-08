import { NextFunction, Request, Response } from "express";
import { Middleware } from "express-validator/src/base";
import HttpStatusCode from "../enums/HttpStatusCode";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Users } from "../interfaces/user.interface";



export const validarJWT : Middleware = ( req : Request, res : Response, next : NextFunction) => {

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
            
            console.log(verify[ 'uid' ]);
            req[ 'uid' ] =  verify[ 'uid' ];
            next();

        } 

    } catch (error) {
        return res.status( HttpStatusCode.UNAUTHORIZED ).json({

            ok  :  false,
            msg : 'Token no válido.'

        })

    }

}

