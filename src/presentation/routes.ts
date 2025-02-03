import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthRepositoryImpl } from "../infrastructure";
import { Request, Response } from "express"
import { AuthDatasourceMysqlImpl } from "../infrastructure/datasources/auth.datasource.mysql.impl";
import { FoodDatasourceMysqlImpl } from "../infrastructure/datasources/food.datasource.mysql.impl";
import { FoodRepositoryImpl } from "../infrastructure/repositories/food.repository.impl";
import { FoodController } from "./food.controller";
export class AppRoutes{

    static get routes(): Router{
        
        const router = Router();
        // Agregar los datasource y repos para cada seccion de la app
        const authdatasourceMysql = new AuthDatasourceMysqlImpl();
        const authRepository = new AuthRepositoryImpl(authdatasourceMysql);
        const authController = new AuthController(authRepository);

        const fooddatasourceMysql = new FoodDatasourceMysqlImpl();
        const foodRepository = new FoodRepositoryImpl(fooddatasourceMysql);
        const foodController = new FoodController(foodRepository);

        // Peticion tipo options
        router.options('*', (req: Request, res:Response)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.status(204).send('Options');
        });
        router.post('/api/auth/login', authController.loginUser);
        router.post('/api/auth/register', authController.registerUser);

        router.get('/api/food', foodController.foodList);

        return router;
    }
}
