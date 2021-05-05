"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.port = '';
        this.app = express_1.default();
        this.middleware();
        this.routes();
        this.ServeApi();
    }
    /* middleware of the server */
    middleware() {
        // this.app.use(logger('dev'));
        // this.app.use(express.json());
        // this.app.use(express.urlencoded({ extended: false}));
        // this.app.use(cookieParser());
    }
    /* Routes of the server */
    routes() {
        /* Products router */
        // this.app.use('/api',ProductsRouter);
        // this.app.use('/api/categories',CategoriesRouter);
    }
    /* Configuration of web server */
    ServeApi() {
        // this.port = this.normalizePort(process.env.PORT || '3000');
        // this.app.set('port',this.port);
        // server = Http.createServer(this.app);
        // server.listen(this.port);
        // server.on('error',this.onError);
        // server.on('listening',this.onListening);
    }
}
exports.App = App;
