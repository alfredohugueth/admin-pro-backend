import { Request, Response } from "express";
import { Users } from '../interfaces/user.interface'
const Usuario = require('../models/usuario.model');

/* GET /api/usuarios */
const getUsuarios = async ( req: Request, res: Response ) =>{


    const usuarios = await Usuario.find(  {}, 'nombre email role google' );

    res.json({
              "ok":true,
              usuarios
    })

}

/* POST /api/usuarios */

const crearUsuarios = async( req: Request, res: Response ) =>{
  
  console.log("🚀 ~ file: usuarios.controllers.ts ~ line 13 ~ crearUsuarios ~ req", req[  'body'  ]);
  const { email, password, nombre } = req[  'body'  ];

  // /* Errores de ruta */
  // const errores = validationResult( req );
  // if ( !errores.isEmpty()) {
  //       return res.status(400).json({
  //           ok: false,
  //           errors: errores.mapped()
  //       })
  // }
  /* Intentamos realizar el procedimiento de guardado de usuario en la base de datos */
  try {
    const existeEmail = await Usuario.findOne(  { email } );

    if ( existeEmail ){
        return res['status']( 500 ).json({
                ok: false,
                msg: 'El correo ya está registrado. '
        });
    }

    const usuario = new Usuario( req['body'] );
    await usuario.save();
    res.json({
              "ok": true,
              usuario
    })
    
  } catch ( error )  {
    console.log("🚀 ~ file: usuarios.controllers.ts ~ line 35 ~ crearUsuarios ~ error", error)
    res.status( 500 ).json({
              "ok": false,
              "msg": 'Error inesperado... revisar logs'
    })
  }

  

} 


module.exports = {
    getUsuarios,
    crearUsuarios
}