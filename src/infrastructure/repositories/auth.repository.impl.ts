import { RegisterUserDto, UserEntity, AuthRepository, AuthDatasource } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';


export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.register(registerUserDto);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDatasource.login(loginUserDto);
    }
}

