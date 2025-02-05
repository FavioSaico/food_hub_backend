import { Request, Response } from "express"
import { CustomError } from "../domain";
import { SharedRepositoryImpl } from "../infrastructure/repositories/shared.repository.impl";

// creamos una clase controlador
export class SharedController{

    constructor (
        private readonly sharedRepostory: SharedRepositoryImpl,
    ){}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston logger
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    headquarters = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        this.sharedRepostory.getHeadquarters()
            .then(headquarters => res.json(headquarters))
            .catch(error => this.handleError(error, res));
    }

    states = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        this.sharedRepostory.getStates()
            .then(states => res.json(states))
            .catch(error => this.handleError(error, res));
    }
}