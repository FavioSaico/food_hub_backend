import { RegisterUserDto, AuthRepository, AuthDatasource } from '../../domain';
import { ChangePasswordDto } from '../../domain/dtos/change-password.dto';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';


export class AuthRepositoryImpl implements AuthRepository {

    constructor(private readonly authDatasource: AuthDatasource) {}

    async changePassword(changePasswordDto: ChangePasswordDto): Promise<UserResponseDto> {
        return this.authDatasource.changePassword(changePasswordDto);
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
        return this.authDatasource.register(registerUserDto);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        return this.authDatasource.login(loginUserDto);
    }
}
