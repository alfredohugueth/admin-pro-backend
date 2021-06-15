
import { Model } from "mongoose";
const fs = require( 'fs' );

import { Users, UsersModel } from '../interfaces/user.interface'
import { Medico } from "../interfaces/medico.interface";
import { Hospital } from "../interfaces/hospital.interface"


const Usuarios:Model<Users & Document> = require('../models/usuario.model');
const medicos:Model<Medico & Document> = require( '../models/medico.model' );
const hospitales:Model<Hospital & Document> = require('../models/hospital.model');


const borrarImagen = ( path ) => {

    if ( fs.existsSync( path ) ) {
        
        fs.unlinkSync( path );
    
    }
    
}


export const actualizarImagen = async ( tipo : string, id : string, nombreArchivo : string ) => {

    switch ( tipo ) {

        case 'medicos' :

            const medico = await medicos.findById( id );
            if ( !medico ) {

                console.log('----> El medico no existe ');
                return false;
            
            }

            /* Borramos la imagen anterior del usuario en caso de que tenga */
            const pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );
            
            /* Actualizamos la foto del usuario */
            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break

        case 'hospitales' :

            const hospital = await hospitales.findById( id );
            if ( !hospital ) {

                console.log('----> El hospital no existe ');
                return false;
            
            }

            /* Borramos la imagen anterior del usuario en caso de que tenga */
            const pathHospital = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathHospital );
            
            /* Actualizamos la foto del usuario */
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        break

        case 'usuarios' :

            const usuario = await Usuarios.findById( id );
            if ( !usuario ) {

                console.log('----> El usuario no existe ');
                return false;
            
            }

            /* Borramos la imagen anterior del usuario en caso de que tenga */
            const pathUsuario = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathUsuario );
            
            /* Actualizamos la foto del usuario */
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;


        break

    }

}

