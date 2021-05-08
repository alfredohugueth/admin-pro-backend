import { Schema, model, Document } from "mongoose";


export interface Users extends Document{
    nombre: string,
    email: string,
    password: string,
    img: string,
    role: string,
    google: boolean,
}

export interface UsersModel extends Users, Document {}