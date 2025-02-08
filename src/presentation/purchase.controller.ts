import { Request, Response } from "express"
import { CustomError } from "../domain";
import { RegisterPurchaseDto } from "../domain/dtos/purchase-register.dto";
import { UpdateStatePurchaseDto } from "../domain/dtos/purchase-update.dto";
import { PurchaseRepository } from "../domain/repositories/purchase.repository";

// creamos una clase controlador
export class PurchaseController{

    constructor (
        private readonly purchaseRepostory: PurchaseRepository,
    ){}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston logger
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerPurchase = async(req: Request, res:Response) => {
    
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        const [error, registarPurchaseDto] = RegisterPurchaseDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.purchaseRepostory.registerPurchase(registarPurchaseDto!)
            .then(id_compra => res.json({id_compra}))
            .catch(error => this.handleError(error, res));
    }

    updateStatePurchase = async(req: Request, res:Response) => {
    
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        const [error, updateStatePurchaseDto] = UpdateStatePurchaseDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.purchaseRepostory.updateStatePurchase(updateStatePurchaseDto!)
            .then(id_compra => res.json({id_compra}))
            .catch(error => this.handleError(error, res));
    }

    getPurchase = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        const {id} = req.params;

        this.purchaseRepostory.getPurchase(Number(id))
            .then(purchase => res.json(purchase))
            .catch(error => this.handleError(error, res));
    }

    getListPurchase = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        this.purchaseRepostory.getListPurchase()
            .then(listPurchase => res.json(listPurchase))
            .catch(error => this.handleError(error, res));
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