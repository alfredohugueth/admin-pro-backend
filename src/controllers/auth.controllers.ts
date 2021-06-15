/* API Imports */

import { Request, Response } from "express";
import { Model } from "mongoose";
import bcrypt from "bcryptjs";

/* Interface Imports */

import { Users, UsersModel } from '../interfaces/user.interface'

/* Models imports */

const Usuario:Model<Users & Document> = require('../models/usuario.model');

/* Enums imports */

import HttpStatusCode from '../enums/HttpStatusCode';

/* Helpers imports */

import { generarJWT } from "../helpers/jwt";
import { googleVerify } from "../helpers/google-verify";

/* GET /api/auth */

const login = async ( req : Request, res : Response ) => {
    
    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        /* Verificar email */
        
        if( !usuarioDB ){
            
            return res.status(HttpStatusCode.NOT_FOUND).json({
        
                ok:   false,
                msg: "No existe un usuario con este email."
        
            });

        }

        /* Verificar password */

        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if ( !validPassword ) {

            return res.status(HttpStatusCode.BAD_REQUEST).json({
        
                ok:   false,
                msg: "Contraseña no valida."
        
            });

        }

        /* Generar el TOKEN JWT */

        const token = await generarJWT( usuarioDB.id );



        res.json({

            ok : true,
            token

        })

    } catch (error) {
        
        console.log("🚀 ~ file: usuarios.controllers.ts ~ line 35 ~ crearUsuarios ~ error", error)
        res.status( 500 ).json({

        "ok":   false,
        "msg": ' Hable con el administrador '

        })

    }

}

const googleSignIn = async ( req : Request, res : Response ) => {

    const googleToken = req.body[ 'token' ];

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        /* Verificamos si el usuario existe */
        const usuarioDB = await Usuario.findOne( { email } );
        let usuario;
        if ( !usuarioDB ) {

            usuario = new Usuario({
                
                nombre: name,
                email,
                password: '@@@',
                img : picture,
                google: true

            })
        
        } else {

            /* El usuario existe */
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';

        }

        /* Guardar en DB */
        await usuario.save();

        /* Generamos JWT */
        const token = await generarJWT( usuario.id );

        
        res.json({
    
            ok : true,
            token
    
        })

    } catch (error) {
        
        res.status(401).json({
    
            ok : false,
            msg : 'Token no es correcto'
    
        })

    }

}

module.exports = {
    login,
    googleSignIn
}