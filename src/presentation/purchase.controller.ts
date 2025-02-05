import { Request, Response } from "express"
import { CustomError } from "../domain";
import { PurchaseRepositoryImpl } from "../infrastructure";

// creamos una clase controlador
export class PurchaseController{

    constructor (
        private readonly purchaseRepostory: PurchaseRepositoryImpl,
    ){}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston logger
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    typesPayment = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        this.purchaseRepostory.getTypesPayment()
            .then(typesPayment => res.json(typesPayment))
            .catch(error => this.handleError(error, res));
    }

    typesPurchase = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        this.purchaseRepostory.getTypesPurchase()
            .then(typesPurchase => res.json(typesPurchase))
            .catch(error => this.handleError(error, res));
    }
}