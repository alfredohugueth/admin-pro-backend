/* Server Imports */

import express, { Application, NextFunction, Response } from "express";
import Http from "http";
import debug from "debug";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"

/* Database Import*/

import { DbConnection } from "./database/config";

/* Router Imports */

import usuariosRouter from "./routes/usuarios.routes";
import authRouter from "./routes/auth.routes";
import hosptialRouter from "./routes/hospitales.routes"
import medicosRouter from "./routes/medicos.routes"
import busquedaRouter from "./routes/busquedas.routes";
import uploadsRouter from "./routes/uploads.routes";
import { angularController } from "./controllers/angular.controllers";

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
        this.Public();
        this.routes();
        this.ServeApi();
        /*DbConnection */
        DbConnection();
        
        
    }
    

    /* middleware of the server */

    middleware(){
        /* Configurar CORS*/
        this.app.use(cors());
        this.app.use(logger('dev'));
        /* Lectura y parseo del body */
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}));
        this.app.use(cookieParser());
        
        
        
    }

    /* Public directory */
    Public() {

      this.app.use( express.static( 'public' ));

    }

    /* Routes of the server */
    routes(){

      
      this.app.use( '/api/usuarios', usuariosRouter );
      this.app.use( '/api/hospitales', hosptialRouter );
      this.app.use( '/api/medicos', medicosRouter );
      this.app.use( '/api/login', authRouter );
      this.app.use( '/api/todo', busquedaRouter);
      this.app.use( '/api/upload', uploadsRouter);


      /* Lo ultimo, rutas de aplicación de angular */

      this.app.get( '*', angularController );
    
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