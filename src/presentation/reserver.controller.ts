import { Request, Response } from "express"
import { CustomError } from "../domain";
import { ReserveRepository } from "../domain/repositories/reserve.repository";
import { RegisterReserveDto } from "../domain/dtos/revese-register.dto";
import { UpdateStateReserveDto } from "../domain/dtos/reserve-update.dto";

// creamos una clase controlador
export class ReserveController{

    constructor (
        private readonly reserveRepostory: ReserveRepository,
    ){}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston logger
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    getReserve = async(req: Request, res:Response) => {
    
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        const {id} = req.params;

        this.reserveRepostory.getReserve(Number(id))
            .then(reserve => res.json(reserve))
            .catch(error => this.handleError(error, res));
    }

    getListReserve = async(req: Request, res:Response) => {
    
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        this.reserveRepostory.getListReserve()
            .then(listReserve => res.json(listReserve))
            .catch(error => this.handleError(error, res));
    }

    registerReserve = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        const [error, registerReserveDto] = RegisterReserveDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.reserveRepostory.registerReserve(registerReserveDto!)
            .then(id_reserva => res.json({id_reserva}))
            .catch(error => this.handleError(error, res));
    }

    updateStateReserve = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        
        const [error, updateReserveDto] = UpdateStateReserveDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.reserveRepostory.updateStateReserve(updateReserveDto!)
            .then(id_reserva => res.json({id_reserva}))
            .catch(error => this.handleError(error, res));
    }

    getZones = async(req: Request, res:Response) => {
    
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        const { id_sede } = req.query;
        
        this.reserveRepostory.getZone(Number(id_sede))
            .then(listZones => res.json(listZones))
            .catch(error => this.handleError(error, res));
    }
}