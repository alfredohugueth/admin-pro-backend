import { Request, Response } from "express";

export class MedicosController { 

    public getMedicos = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'getMedicos'
    
        })
    
    }

    public crearMedicos = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'crearMedicos'
    
        })
    
    }

    public borrarMedicos = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'borrarMedicos'
    
        })
    
    }

    public actualizarMedicos = ( req: Request, res: Response ) => {

        res.json({
            
            ok: true,
            msg: 'actualizarMedicos'
    
        })
    
    }
    
    
    
}