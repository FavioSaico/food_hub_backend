import { UserEntity } from "../entities/user-entity";
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from "../dtos/login-user.dto";


export abstract class AuthRepository{

    abstract register(registerUserDto: RegisterUserDto):Promise<UserEntity>;

    abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>;
}