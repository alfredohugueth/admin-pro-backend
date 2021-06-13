/* API Imports */

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Model } from "mongoose";


/* Interface Imports */

import { Users, UsersModel } from '../interfaces/user.interface'

/* Models imports */

const Usuario:Model<Users & Document> = require('../models/usuario.model');

/* Enums imports */

import HttpStatusCode from '../enums/HttpStatusCode'

/* Helpers imports */

import { generarJWT } from "../helpers/jwt";




/* GET /api/usuarios */

const getUsuarios = async ( req: Request, res: Response ) =>{

  const desde = Number(req.query.desde) || 0;

  console.log(desde);


  // const usuarios = await Usuario
  //                               .find(  {}, 'nombre email role google' )
  //                               .skip( desde )
  //                               .limit( 5 )

  // const total = await Usuario.count()

  const [ usuarios, total] = await Promise.all([
      Usuario
             .find(  {}, 'nombre email role google' )
             .skip( desde )
             .limit( 5 ),
      
      Usuario.count()        
  ]);

  res.json({

    "ok":true,
     usuarios,
     uid: req[ 'uid' ],
     total

  })

}

/* POST /api/usuarios */

const crearUsuarios = async( req: Request, res: Response ) =>{
  
  console.log("🚀 ~ file: usuarios.controllers.ts ~ line 13 ~ crearUsuarios ~ req", req[  'body'  ]);
  const { email, password, nombre } = req[  'body'  ];

  /* Intentamos realizar el procedimiento de guardado de usuario en la base de datos */

  try {

    const existeEmail = await Usuario.findOne(  { email } );

    if ( existeEmail ){

        return res['status']( 500 ).json({
          
          ok:   false,
          msg: 'El correo ya está registrado. '

      });

    }

    const usuario = new Usuario( req['body'] );
    
    /* Encriptar contraseña */
    
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    /* Save user */
    
    await usuario.save();

    /* Generamos el JWT */

    const token = await generarJWT( usuario.id );

    res.json({
      
      "ok": true,
       usuario,
       token

    })
    
  } catch ( error )  {
    
    console.log("🚀 ~ file: usuarios.controllers.ts ~ line 35 ~ crearUsuarios ~ error", error)
    res.status( 500 ).json({

      "ok":   false,
      "msg": 'Error inesperado... revisar logs'

    })
  
  }

} 

/* PUT /api/usuarios/:id */

const actualizarUsuario = async ( req : Request, res : Response ) => {

  /* TODO: Validar token y comprobar si es el usuario correcto */
  
  const uid = req.params.id;
  const {} = req[ 'body' ];

  try {

    const usuarioDB = await Usuario.findById( uid );

    if( !usuarioDB ){

      return res.status(HttpStatusCode.NOT_FOUND).json({
        
        ok:   false,
        msg: "No existe un usuario con ese id."

      });

    }

    /* Actualizaciones */

    const { password, google, email, ...campos } = req[ 'body' ];

    if ( usuarioDB.email !== email ){ 
    
      const existeEmail = await Usuario.findOne({ email });
      if ( existeEmail ) return res.status( HttpStatusCode.BAD_REQUEST ).json({
        ok :    false,
        msg : ' Ya existe un usuario con este email '
      });

    }
    
    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });

    
    res.json({

      ok:true,
      usuarioActualizado

    });
    
  } catch (error) {
    
    console.log("🚀 ~ file: usuarios.controllers.ts ~ line 85 ~ actualizarUsuario ~ error", error)
    res.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
    res.json( {

      ok:    false,
      msg:  "Error Inesperado."

    }) 
  
  }

}

/* DELETE /api/usuarios/:id */

const borrarUsuario = async ( req : Request, res : Response ) => {

  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById( uid );
    if( !usuarioDB ){

      return res.status(HttpStatusCode.NOT_FOUND).json({
        
        ok:   false,
        msg: "No existe un usuario con ese id."

      });

    }

    await Usuario.findByIdAndDelete( uid );

    res.json({
      
      ok:   true,
      msg:  "Usuario Eliminado"

    })

  } catch (error) {
    console.log(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      
      ok :   false,
      msg : 'Hable con el administrador'

    })

  }

}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}