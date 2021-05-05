import { Request, Response } from "express";

const getUsuarios = ( req: Request, res: Response ) =>{

    res.json({
      "ok":true,
      'usuarios':[],
    })

}


module.exports = {
    getUsuarios
}