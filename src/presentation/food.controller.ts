import { Request, Response } from "express"
import { CustomError } from "../domain";
import { FoodRepository } from "../domain/repositories/food.repository";

// creamos una clase controlador
export class FoodController{

    constructor (
        private readonly foodRepostory: FoodRepository,
    ){}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston logger
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    foodList = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        this.foodRepostory.foodList()
            .then(foodList => res.json(foodList))
            .catch(error => this.handleError(error, res));
    }
}