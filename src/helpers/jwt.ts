
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { TokenCallbackFn } from 'morgan';

export const generarJWT = ( uid ) => {

    return new Promise ( ( resolve, reject ) => {
        
        const payload = {
            uid,
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            
            expiresIn: '12h'
        
        }, ( err : JsonWebTokenError, token  ) => {
    
            if (err) {
                
                console.log("🚀 ~ file: jwt.ts ~ line 17 ~ generarJWT ~ err", err);
                reject( 'No se pudo generar el Web Token' );
                
            } else resolve ( token );
    
        });

    });

}

module.exports = {
    generarJWT
}