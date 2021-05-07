import { Schema, model } from "mongoose";


export interface Users extends Document{
    nombre: string,
    email: string,
    password: string,
    img: string,
    role: string,
    google: boolean,
}