import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from "../dtos/login-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";


export abstract class AuthRepository{

    abstract register(registerUserDto: RegisterUserDto):Promise<UserResponseDto>;

    abstract login(loginUserDto: LoginUserDto):Promise<UserResponseDto>;
}