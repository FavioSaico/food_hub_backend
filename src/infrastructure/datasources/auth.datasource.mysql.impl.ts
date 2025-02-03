import { CustomError,RegisterUserDto, UserEntity, AuthDatasource } from '../../domain';
// import { MongoDatabase, UserModel } from '../../data/mongodb';
// import { UserMapper } from '../mappers/user.mapper';
import { BcryptAdapter, envs } from '../../config';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';
import { MysqlDatabase } from '../../data/mysql/mysql-database';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

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
        const {nombre, tipo_usuario, correo, clave, direccion} = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const [results] = await this.connection!.execute<UserEntity[] & RowDataPacket[]>(
                "SELECT * FROM Usuario WHERE correo = ?", 
                [correo]
            );
            
            if(results.length != 0) throw CustomError.badRequest('Correo registrado');

            // 2. Encriptar la contraseña
            const claveEncriptada = this.hashPassword(clave);
            const [insertResult] = await this.connection!.execute<ResultSetHeader>(
                "insert into Usuario (tipo_usuario,nombre, correo, clave, direccion) VALUES (?,?,?,?,?);", 
                [tipo_usuario,nombre,correo, claveEncriptada, direccion]
            );

            const insertId = insertResult.insertId; // ID del nuevo registro

            // Recuperamos el registro insertado
            const [userInsert] = await this.connection!.execute<RowDataPacket[]>(
                "SELECT * FROM Usuario WHERE id_usuario = ?",
                [insertId]
            );
            // this.connection!.end();
            const user = userInsert[0] as UserEntity;

            // 3. Mapear la respuesta a nuestra entidad
            return user;

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

            const [results] = await this.connection!.execute<UserEntity[] & RowDataPacket[]>("SELECT * FROM Usuario WHERE correo = ?", [email]);
            // this.connection!.end();
            
            // console.log(results);
            if(!results || results.length == 0) throw CustomError.badRequest('Correo no registrado');

            const user = results[0] as UserEntity;
            // console.log(user)

            // 2. Comparamos las contraseñas
            const isMatching = this.comparePassword(password, user.clave);
            if(!isMatching) throw CustomError.badRequest('Correo o contraseña son incorrectos');
            console.log(isMatching)

            return user;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}

