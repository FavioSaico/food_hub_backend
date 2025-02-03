import { CustomError,RegisterUserDto, UserEntity, AuthDatasource } from '../../domain';
import MySQLConnection from "../../data/mysql/mysql-adapter";
import { BcryptAdapter } from '../../config';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceMysqlImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){
    }

    // recibe un RegisterUserDto y retorna un UserEntity
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {nombre, tipo_usuario, correo, clave, direccion} = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const results = await MySQLConnection.query<UserEntity[] & RowDataPacket[]>(
                "SELECT * FROM Usuario WHERE correo = ?", 
                [correo]
            );
            
            if(results.length != 0) throw CustomError.badRequest('Correo registrado');

            // 2. Encriptar la contraseña
            const claveEncriptada = this.hashPassword(clave);
            const insertResult = await MySQLConnection.query<ResultSetHeader>(
                "INSERT INTO Usuario (tipo_usuario,nombre, correo, clave, direccion) VALUES (?,?,?,?,?);", 
                [tipo_usuario,nombre,correo, claveEncriptada, direccion]
            );

            const insertId = insertResult.insertId; // ID del nuevo registro

            // Recuperamos el registro insertado
            const userInsert = await MySQLConnection.query<RowDataPacket[]>(
                "SELECT * FROM Usuario WHERE id_usuario = ?",
                [insertId]
            );
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
        const {correo, clave} = loginUserDto;

        try {

            const results = await MySQLConnection.query<UserEntity[] & RowDataPacket[]>(
                "SELECT * FROM Usuario WHERE correo = ?", 
                [correo]
            );

            if(!results || results.length == 0) throw CustomError.badRequest('Correo no registrado');

            const user = results[0] as UserEntity;

            // 2. Comparamos las contraseñas
            const isMatching = this.comparePassword(clave, user.clave);
            if(!isMatching) throw CustomError.badRequest('Correo o contraseña son incorrectos');

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

