"use strict";
/* Server Imports */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
/* Database Import*/
const config_1 = require("./database/config");
/* Router Imports */
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const hospitales_routes_1 = __importDefault(require("./routes/hospitales.routes"));
const medicos_routes_1 = __importDefault(require("./routes/medicos.routes"));
const busquedas_routes_1 = __importDefault(require("./routes/busquedas.routes"));
const uploads_routes_1 = __importDefault(require("./routes/uploads.routes"));
/* Interfaces Imports */
let server;
class App {
    constructor() {
        /* Env variables configuration */
        dotenv_1.default.config();
        this.port = '';
        this.app = express_1.default();
        this.middleware();
        this.Public();
        this.routes();
        this.ServeApi();
        /*DbConnection */
        config_1.DbConnection();
    }
    /* middleware of the server */
    middleware() {
        /* Configurar CORS*/
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('dev'));
        /* Lectura y parseo del body */
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
    }
    /* Public directory */
    Public() {
        this.app.use(express_1.default.static('public'));
    }
    /* Routes of the server */
    routes() {
        this.app.use('/api/usuarios', usuarios_routes_1.default);
        this.app.use('/api/hospitales', hospitales_routes_1.default);
        this.app.use('/api/medicos', medicos_routes_1.default);
        this.app.use('/api/login', auth_routes_1.default);
        this.app.use('/api/todo', busquedas_routes_1.default);
        this.app.use('/api/upload', uploads_routes_1.default);
    }
    /* Configuration of web server */
    ServeApi() {
        this.port = this.normalizePort(process.env.PORT || '3000');
        this.app.set('port', this.port);
        server = http_1.default.createServer(this.app);
        server.listen(this.port);
        server.on('error', this.onError);
        server.on('listening', this.onListening);
    }
    /* Functions for initialize the server */
    normalizePort(val) {
        var port = parseInt(val);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }
    /* Event listener for HTTP server 'Errors" event*/
    onError(error) {
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
    onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug_1.default('Listening on ' + bind);
        console.log('Listening on ' + bind);
    }
}
exports.App = App;
