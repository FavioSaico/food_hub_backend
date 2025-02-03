import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from "../infrastructure";
import { Request, Response } from "express"
import { AuthDatasourceMysqlImpl } from "../infrastructure/datasources/auth.datasource.mysql.impl";
export class AppRoutes{

    static get routes(): Router{
        
        const router = Router();
        // Agregar los datasource y repos para cada seccion de la app
        const datasourceMysql = new AuthDatasourceMysqlImpl();
        
        const authRepository = new AuthRepositoryImpl(datasourceMysql);

        const controller = new AuthController(authRepository);

        // Peticion tipo options
        router.options('*', (req: Request, res:Response)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.status(204).send('Options');
        });
        router.post('/api/auth/login', controller.loginUser);
        router.post('/api/auth/register', controller.registerUser);

        return router;
    }
}
