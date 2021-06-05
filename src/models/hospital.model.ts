import { Schema, model} from "mongoose";
import { Hospital, HospitalModel } from "../interfaces/hospital.interface";

const HospitalSchema = new Schema({
    nombre: {

        type:String,
        required: true,
        
    },
    img: {

        type:String,

    },
    usuario: {

        type: Schema.Types.ObjectId,
        ref: 'Usuario'

    }
    

}, { collection: 'hospitales'});

HospitalSchema.method('toJSON', function(this:HospitalModel){
    const { __v, ...Object} = this.toObject();
    return Object;
})

module.exports = model<Hospital & Document>( 'Hospital', HospitalSchema);