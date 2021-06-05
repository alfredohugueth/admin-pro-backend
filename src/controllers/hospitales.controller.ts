import { Request, Response } from "express";

export class HospitalController { 

    public getHospitales = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'getHospitales'
    
        })
    
    }

    public crearHospital = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'crearHospital'
    
        })
    
    }

    public borrarHospital = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'borrarHospital'
    
        })
    
    }

    public actualizarHospital = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'actualizarHospital'
    
        })
    
    }
    
    
    
}