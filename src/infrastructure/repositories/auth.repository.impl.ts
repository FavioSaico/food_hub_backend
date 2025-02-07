import { RegisterUserDto, AuthRepository, AuthDatasource } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';


export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
        return this.authDatasource.register(registerUserDto);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        return this.authDatasource.login(loginUserDto);
    }
}

