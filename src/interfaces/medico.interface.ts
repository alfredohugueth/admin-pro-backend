import { Schema, model, Document } from "mongoose";


export interface Medico extends Document{
    nombre: string,
    img: string,
    usuario: Schema.Types.ObjectId,
    hospital:Schema.Types.ObjectId
}

export interface MedicoModel extends Medico, Document {}