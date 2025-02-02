import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceMongoImpl, AuthRepositoryImpl } from "../infrastructure";
import { Request, Response } from "express"
export class AppRoutes{

    static get routes(): Router{
        
        const router = Router();

        const datasourceMongo = new AuthDatasourceMongoImpl();
        const authRepository = new AuthRepositoryImpl(datasourceMongo);

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
