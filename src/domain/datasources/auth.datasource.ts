import { UserEntity } from "../entities/user-entity";
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';


// Datasource: puede ser de mongo, mysql, postgres, etc.
export abstract class AuthDatasource{

    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>

    abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>

    abstract connectDatabase():void;
}