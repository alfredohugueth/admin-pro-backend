import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import { Middleware } from "express-validator/src/base";


export const validarCampos : Middleware = ( req : Request, res: Response, next:NextFunction ) =>  {

    /* Errores de ruta */
  const errores = validationResult( req );
  if ( !errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
  }

  next()

}

