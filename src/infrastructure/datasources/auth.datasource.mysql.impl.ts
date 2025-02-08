import { CustomError,RegisterUserDto, UserEntity, AuthDatasource } from '../../domain';
import MySQLConnection from "../../data/mysql/mysql-adapter";
import { BcryptAdapter } from '../../config';
import { LoginUserDto } from '../../domain/dtos/login-user.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';
import { ChangePasswordDto } from '../../domain/dtos/change-password.dto';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceMysqlImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ){
    }

    // recibe un RegisterUserDto y retorna un UserEntity
    async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
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
            return new UserResponseDto(user.id_usuario, user.tipo_usuario, user.nombre,user.correo,user.direccion);

        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
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

            return new UserResponseDto(user.id_usuario, user.tipo_usuario, user.nombre,user.correo,user.direccion);
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async changePassword(changePasswordDto: ChangePasswordDto): Promise<UserResponseDto> {
        const { id_usuario, clave_actual, clave_nueva } = changePasswordDto;
    
        try {
            // 1. Verificar si el usuario existe por id_usuario
            const results = await MySQLConnection.query<UserEntity[] & RowDataPacket[]>(
                "SELECT * FROM Usuario WHERE id_usuario = ?", 
                [id_usuario]
            );
    
            if (!results || results.length === 0) {
                throw CustomError.badRequest('Usuario no encontrado');
            }
    
            const user = results[0] as UserEntity;
    
            // 2. Comparar la contraseña actual
            const isMatching = this.comparePassword(clave_actual, user.clave);
            if (!isMatching) {
                throw CustomError.badRequest('La contraseña actual es incorrecta');
            }
    
            // 4. Hashear la nueva contraseña
            const nuevaClaveEncriptada = this.hashPassword(clave_nueva);
    
            // 5. Actualizar la contraseña en la base de datos
            await MySQLConnection.query(
                "UPDATE Usuario SET clave = ? WHERE id_usuario = ?", 
                [nuevaClaveEncriptada, id_usuario]
            );
    
            // 6. Obtener el usuario actualizado
            const updatedUserResults = await MySQLConnection.query<UserEntity[] & RowDataPacket[]>(
                "SELECT * FROM Usuario WHERE id_usuario = ?", 
                [id_usuario]
            );
    
            const updatedUser = updatedUserResults[0] as UserEntity;
    
            // 7. Retornar el usuario actualizado en formato UserResponseDto
            return new UserResponseDto(updatedUser.id_usuario, updatedUser.tipo_usuario, updatedUser.nombre, updatedUser.correo, updatedUser.direccion);
    
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}

