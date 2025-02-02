import { Request, Response } from "express"
import { AuthRepository, CustomError, RegisterUserDto } from "../domain";
import { LoginUserDto } from "../domain/dtos/login-user.dto";
// import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";

// creamos una clase controlador
export class AuthController{

    constructor (
        private readonly authRepostory: AuthRepository,
    ){}

    private handleError = ( error: unknown, res: Response ) => {

        if ( error instanceof CustomError ) {
            //retornamos el error en el response
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(error); // Winston logger
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerUser = async(req: Request, res:Response) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        // registramos en la base de datos
        this.authRepostory.register(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }

    loginUser = async(req: Request, res:Response) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});

        this.authRepostory.login(loginUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }
}