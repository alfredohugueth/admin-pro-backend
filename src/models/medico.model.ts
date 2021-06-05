import { Schema, model} from "mongoose";
import { Medico, MedicoModel } from "../interfaces/medico.interface";

const MedicoSchema = new Schema({
    nombre: {

        type:String,
        required: true,
        
    },
    img: {

        type:String,

    },
    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true

    },
    hospital: {

        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true

    }
    

}, { collection: 'Medicos'});

MedicoSchema.method('toJSON', function(this:MedicoModel){
    const { __v, ...Object} = this.toObject();
    return Object;
})

module.exports = model<Medico & Document>( 'Medico', MedicoSchema);