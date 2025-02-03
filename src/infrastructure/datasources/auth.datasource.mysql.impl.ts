import { CustomError,RegisterUserDto, UserEntity, AuthDatasource } from '../../domain';
import { MongoDatabase, UserModel } from '../../data/mongodb';
import { UserMapper } from '../mappers/user.mapper';
import { BcryptAdapter, envs } from '../../config';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';
import { MysqlDatabase } from '../../data/mysql/mysql-database';
import mysql, { FieldPacket, QueryResult, RowDataPacket } from 'mysql2/promise';

// IMPLEMENTAMOS MYSQL

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceMysqlImpl implements AuthDatasource {

    private connection?: mysql.Connection;

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){
        this.connectDatabase();
    }
    async connectDatabase(){
        
        this.connection = await MysqlDatabase.connect({
            host: envs.MYSQL_HOST,
            user: envs.MYSQL_USER,
            dbName: envs.MYSQL_DB_NAME,
            password: envs.MYSQL_PASS
        });
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
        const {email, password} = loginUserDto;

        try {

            // const values = [username, password]
            // 
            console.log('Desde mysql');
            const [results] = await this.connection!.execute<UserEntity[] & RowDataPacket[]>("SELECT * FROM Usuario WHERE correo = ? AND clave = ?", [email, password]);
            console.log(results);
            
            if(!results || results.length == 0) throw CustomError.badRequest('Usuario no registrado');

            // console.log(results);
            const userdb = results as UserEntity[];
            this.connection?.end()

            const user = {
                id_usuario: results[0].id_usuario, 
                tipo_usuario: results[0].tipo_usuario,
                nombre: results[0].nombre, 
                correo: results[0].correo, 
                clave: results[0].clave, 
                direccion: results[0].direccion
            }
            // 2. Comparamos las contraseñas
            // const isMatching = this.comparePassword(password, user.password);
            // if(!isMatching) throw CustomError.badRequest('Correo o contraseña son incorrectos');

            // 3. Mapear la respuesta a nuestra entidad
            // return UserMapper.userEntityFromObject(user);
            return userdb[0];

        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}

export class UserEntity2 implements RowDataPacket {

    constructor(
        public id_usuario: string,
        public tipo_usuario: string,
        public nombre: string,
        public correo: string,
        public clave: string,
        public direccion: string,
    ){

    }
    [column: number]: any;
    [column: string]: any;
    
    ['constructor']: {name: 'RowDataPacket'} = {
        name: 'RowDataPacket'
    };
}
