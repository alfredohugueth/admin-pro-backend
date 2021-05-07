import { NextFunction, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";


export const validarCampos= ( req, res: Response, next:NextFunction ) =>  {

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

