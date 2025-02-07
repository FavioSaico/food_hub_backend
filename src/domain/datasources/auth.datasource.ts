import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserResponseDto } from "../dtos/user-response.dto";


// Datasource: puede ser de mongo, mysql, postgres, etc.
export abstract class AuthDatasource{

    abstract register(registerUserDto: RegisterUserDto):Promise<UserResponseDto>

    abstract login(loginUserDto: LoginUserDto):Promise<UserResponseDto>
}