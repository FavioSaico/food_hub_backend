import express, { Router } from 'express';
import cors from 'cors';
// Opciones del server
interface Options{
    port?: number;
    routes:Router;
}

export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options:Options){
        const { port = 3100, routes } = options;

        this.port = port;
        this.routes = routes;
    }

    async start(){
        // Middlewares
        this.app.use(express.json());
        this.app.use(cors());

        // agregamos las rutas al server
        this.app.use(this.routes)

        //  arrancamos el server
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${ this.port }`)
        })
    }
}