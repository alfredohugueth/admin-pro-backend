
import { Request, Response } from "express";
import { Model } from "mongoose";

/* Interface Imports */

import { Users, UsersModel } from '../interfaces/user.interface'

/* Models imports */

const Usuario:Model<Users & Document> = require('../models/usuario.model');

/* Enums imports */

import HttpStatusCode from '../enums/HttpStatusCode'

export class BusquedasController {

    private getBusqueda = async ( req: Request, res: Response) => {

        const nombre = req.params [ 'busqueda' ]

        const busqueda = await Usuario.find( {nombre: nombre} );

        res.json({
            
            ok: true,
            busqueda

        })

    }
}
