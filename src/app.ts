/* Server Imports */

import express, { Application, NextFunction } from "express";
import Http from "http";
import debug from "debug";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";

/* Database Import*/
import { DbConnection } from "./database/config";

/* Router Imports */

/* Interfaces Imports */






let server:Http.Server

export class App{
    public app:Application;
    public port:Number | Boolean | String;
    
    
    

    constructor() {
        /* Env variables configuration */
        dotenv.config();
        this.port = '';
        this.app = express();
        this.middleware();
        this.routes();
        this.ServeApi();
        /*DbConnection */
        DbConnection();
        
        
    }
    /* DB Info
    user:mean_user
    password: FDXjRvfOfIOyMQet
    */

    /* middleware of the server */

    middleware(){
        this.app.use(cors());
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}));
        this.app.use(cookieParser());
        
        
        
    }

    /* Routes of the server */
    routes(){
      this.app.get('/', (req , res ) =>{
          res.json({
            "ok":true,
            "msg":"Hola Mundo"
          })
      })
        // this.app.use('/api',ProductsRouter);
        // this.app.use('/api/categories',CategoriesRouter);
    }


    /* Configuration of web server */
    ServeApi(){

         this.port = this.normalizePort(process.env.PORT || '3000');
         this.app.set('port',this.port);
         server = Http.createServer(this.app);
         server.listen(this.port);
         server.on('error',this.onError);
         server.on('listening',this.onListening);




    }

    /* Functions for initialize the server */
    normalizePort(val:string){
        var port = parseInt(val);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if(port>=0){
             return port;
        }

        return false
    }


    /* Event listener for HTTP server 'Errors" event*/
    onError(error:any){

        if (error.syscall !== 'listen') {
            throw error;
          }
        
          var bind = typeof this.port === 'string'
            ? 'Pipe ' + this.port
            : 'Port ' + this.port;
        
          // handle specific listen errors with friendly messages
          switch (error.code) {
            case 'EACCES':
              console.error(bind + ' requires elevated privileges');
              process.exit(1);
              break;
            case 'EADDRINUSE':
              console.error(bind + ' is already in use');
              process.exit(1);
              break;
            default:
              throw error;
          }

    }

    /* Event listener for HTTP server 'Listening' event */

    onListening(){
        var addr = server.address();
        var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
        debug('Listening on ' + bind);
        console.log('Listening on ' +bind);
    }


}