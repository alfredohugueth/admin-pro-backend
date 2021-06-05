import { Schema, model, Document } from "mongoose";


export interface Hospital extends Document{
    nombre: string,
    img: string,
    usuario: Schema.Types.ObjectId
}

export interface HospitalModel extends Hospital, Document {}