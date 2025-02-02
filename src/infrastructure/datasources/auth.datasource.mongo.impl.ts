import { CustomError,RegisterUserDto, UserEntity, AuthDatasource } from '../../domain';
import { MongoDatabase, UserModel } from '../../data/mongodb';
import { UserMapper } from '../mappers/user.mapper';
import { BcryptAdapter, envs } from '../../config';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';

// IMPLEMENTAMOS MONGO

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceMongoImpl implements AuthDatasource{

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){
        this.connectDatabase();
    }
    async connectDatabase(){
        await MongoDatabase.connect({
            mongoUrl:envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    }

    // recibe un RegisterUserDto y retorna un UserEntity
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {nombres, apellidos,celular, correo, password} = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const exists = await UserModel.findOne({correo:correo}); // buscamos un registro que tenga el mismo email
            if(exists) throw CustomError.badRequest('User already exists');

            // 2. Encriptar la contraseña
            const user = await UserModel.create({
                nombres: nombres,
                apellidos: apellidos,
                celular: celular,
                correo: correo,
                password: this.hashPassword(password)
            });
            await user.save();

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user);

        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const {correo, password} = loginUserDto;

        try {
            // 1. Verificar si el correo existe
            const user = await UserModel.findOne({correo:correo});
            if(!user) throw CustomError.badRequest('Correo no registrado');

            // 2. Comparamos las contraseñas
            const isMatching = this.comparePassword(password, user.password);
            if(!isMatching) throw CustomError.badRequest('Correo o contraseña son incorrectos');

            // 3. Mapear la respuesta a nuestra entidad
            return UserMapper.userEntityFromObject(user);

        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}

