import { Request, Response } from "express";
import path from "path";


export const angularController = ( req : Request, res : Response ) => 
{

    res.sendFile( path.resolve( __dirname, '../../public/index.html') );

}