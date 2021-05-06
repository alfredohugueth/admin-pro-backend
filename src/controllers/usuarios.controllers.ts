import { Request, Response } from "express";
const Usuario = require('../models/usuario.model');

const getUsuarios = async ( req: Request, res: Response ) =>{


    const usuarios = await Usuario.find({}, 'nombre email role google' )

    res.json({
              "ok":true,
              usuarios
    })

}

const crearUsuarios = async( req: Request, res: Response ) =>{
  
  console.log("🚀 ~ file: usuarios.controllers.ts ~ line 13 ~ crearUsuarios ~ req", req['body']);
  const {email, password, nombre} = req['body'];

  const usuario = new Usuario( req['body'] );

  await usuario.save();

  res.json({
            "ok": true,
            usuario
  })

} 


module.exports = {
    getUsuarios,
    crearUsuarios
}