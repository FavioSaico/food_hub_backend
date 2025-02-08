import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthRepositoryImpl, PurchaseRepositoryImpl } from "../infrastructure";
import { Request, Response } from "express"
import { AuthDatasourceMysqlImpl } from "../infrastructure/datasources/auth.datasource.mysql.impl";
import { FoodDatasourceMysqlImpl } from "../infrastructure/datasources/food.datasource.mysql.impl";
import { FoodRepositoryImpl } from "../infrastructure/repositories/food.repository.impl";
import { FoodController } from "./food.controller";
import { PurchaseDatasourceMysqlImpl } from "../infrastructure/datasources/purchase.datasource.mysql.impl";
import { PurchaseController } from "./purchase.controller";
import { SharedDatasourceMysqlImpl } from "../infrastructure/datasources/shared.datasource.mysql.impl";
import { SharedRepositoryImpl } from "../infrastructure/repositories/shared.repository.impl";
import { SharedController } from "./shared.controller";
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

        const purchaseDatasourceMysql = new PurchaseDatasourceMysqlImpl();
        const purchaseRepository = new PurchaseRepositoryImpl(purchaseDatasourceMysql);
        const purchaseController = new PurchaseController(purchaseRepository);

        const sharedDatasourceMysql = new SharedDatasourceMysqlImpl();
        const sharedRepository = new SharedRepositoryImpl(sharedDatasourceMysql);
        const sharedController = new SharedController(sharedRepository);

        // Peticion tipo options
        router.options('*', (req: Request, res:Response)=>{
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.status(204).send('Options');
        });

        router.post('/api/auth/login', authController.loginUser);
        router.post('/api/auth/register', authController.registerUser);
        router.put('/api/auth/changepassword', authController.changePassword);
        
        router.get('/api/food', foodController.foodList);

        router.get('/api/purchase/typesPayment', purchaseController.typesPayment);
        router.get('/api/purchase/typesPruchase', purchaseController.typesPurchase);
        router.get('/api/purchase/:id', purchaseController.getPurchase);
        router.get('/api/purchase/', purchaseController.getListPurchase);
        router.post('/api/purchase/', purchaseController.registerPurchase);
        router.put('/api/purchase/', purchaseController.updateStatePurchase);

        router.get('/api/shared/headquarters', sharedController.headquarters);
        router.get('/api/shared/states', sharedController.states);

        return router;
    }
}
