import mongoose from "mongoose";

export const DbConnection = async()=>{
    try{
        await dbConnection();
        console.log('DB online');
    }catch(err){
        console.log(err);
        throw new Error('Error a la hora de iniciar la DB ver logs');
    }
}


async function dbConnection():Promise<typeof mongoose>{
        return mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true});
    }