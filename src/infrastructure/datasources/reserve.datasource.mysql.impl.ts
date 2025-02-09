import { CustomError } from '../../domain';
import MySQLConnection from "../../data/mysql/mysql-adapter";
import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';
import { ReserveDatasource } from '../../domain/datasources/reserve.datasource';
import { ReserveListDto } from '../../domain/dtos/reserve-list.dto';
import { UpdateStateReserveDto } from '../../domain/dtos/reserve-update.dto';
import { RegisterReserveDto } from '../../domain/dtos/revese-register.dto';
import { ReserveEntity } from '../../domain/entities/reserve-entity';
import { ZoneEntity } from '../../domain/entities/zone-entity';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';
import { HeadquartersEntity } from '../../domain/entities/headquarters-entity';
import { StateEntity } from '../../domain/entities/state-entity';


export class ReserveDatasourceMysqlImpl implements ReserveDatasource{
    constructor(){
    }
    async getReserve(id: number): Promise<ReserveEntity> {
        try {
            const results = await MySQLConnection.query<RowDataPacket[]>(
                `SELECT r.id_reserva, r.id_usuario, r.id_sede, r.id_estado, r.id_zona, r.fecha, r.cantidad_personas, r.requerimientos,
                u.tipo_usuario, u.nombre, u.correo, u.direccion,
                e.tipo_estado, s.sede, z.zona, z.imagen
                FROM Reserva r 
                INNER JOIN Usuario u on u.id_usuario = r.id_usuario
                INNER JOIN Estado e on e.id_estado = r.id_estado
                INNER JOIN Sede s on s.id_sede = r.id_sede
                INNER JOIN Zona z on z.id_zona = r.id_zona
                WHERE id_reserva = ?`,
                [id]
            );

            if (results.length == 0){
                throw CustomError.badRequest("Reserva no encontrada");
            }
            
            const reserva = new ReserveEntity(
                results[0]['id_reserva'],
                new UserResponseDto(results[0]['id_usuario'],results[0]['tipo_usuario'],results[0]['nombre'],results[0]['correo'],results[0]['direccion']),
                new HeadquartersEntity(results[0]['id_sede'],results[0]['sede']),
                new StateEntity(results[0]['id_estado'],results[0]['tipo_estado']),
                new ZoneEntity(results[0]['id_zona'],results[0]['zona'],results[0]['imagen']),
                new Date(new Date(results[0]['fecha'] ?? new Date().valueOf()).valueOf() - new Date().getTimezoneOffset()*60000),
                results[0]['cantidad_personas'],
                results[0]['requerimientos']
            );

            return reserva;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async getListReserve(): Promise<ReserveListDto[]> {
        try {
            const results = await MySQLConnection.query<RowDataPacket[]>(
                `SELECT r.id_reserva, r.id_usuario, r.id_sede, r.id_estado, r.fecha,
                e.tipo_estado, s.sede
                FROM Reserva r 
                INNER JOIN Estado e on e.id_estado = r.id_estado
                INNER JOIN Sede s on s.id_sede = r.id_sede
                ORDER BY r.id_reserva DESC;`,
            );
            let listReserve : ReserveListDto[] = [];
    
            results.forEach( (v)=> {
                listReserve.push(new ReserveListDto(
                    Number(v['id_reserva']),
                    Number(v['id_usuario']),
                    new HeadquartersEntity(v['id_sede'],v['sede']),
                    new StateEntity(v['id_estado'],v['tipo_estado']),
                    new Date(new Date(v['fecha'] ?? new Date().valueOf()).valueOf() - new Date().getTimezoneOffset()*60000),
                ));
            });
    
            return listReserve;
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async getListReserveUser(id_usuario:number): Promise<ReserveListDto[]> {
        try {
            const results = await MySQLConnection.query<RowDataPacket[]>(
                `SELECT r.id_reserva, r.id_usuario, r.id_sede, r.id_estado, r.fecha,
                e.tipo_estado, s.sede
                FROM Reserva r 
                INNER JOIN Estado e on e.id_estado = r.id_estado
                INNER JOIN Sede s on s.id_sede = r.id_sede
                WHERE r.id_usuario = ?
                ORDER BY r.id_reserva DESC;`,
                [id_usuario]
            );
            let listReserve : ReserveListDto[] = [];
    
            results.forEach( (v)=> {
                listReserve.push(new ReserveListDto(
                    Number(v['id_reserva']),
                    Number(v['id_usuario']),
                    new HeadquartersEntity(v['id_sede'],v['sede']),
                    new StateEntity(v['id_estado'],v['tipo_estado']),
                    new Date(new Date(v['fecha'] ?? new Date().valueOf()).valueOf() - new Date().getTimezoneOffset()*60000),
                ));
            });
    
            return listReserve;
        } catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    async registerReserve(registaReserveDto: RegisterReserveDto): Promise<number> {
        try {

            const resultPurchase = await MySQLConnection.query<ResultSetHeader>(
                `
                INSERT INTO Reserva (id_usuario,id_sede,id_estado,id_zona,fecha,cantidad_personas,requerimientos) 
                VALUES (?,?,?,?,?,?,?)
                `,
                [registaReserveDto.id_usuario, registaReserveDto.id_sede, registaReserveDto.id_estado,
                    registaReserveDto.id_zona, new Date(registaReserveDto.fecha), 
                    registaReserveDto.cantidad_personas, registaReserveDto.requerimientos
                ]
            );

            return resultPurchase.insertId;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async updateStateReserve(updateReserveDto: UpdateStateReserveDto): Promise<number> {
        try {
            
            const results = await MySQLConnection.query<RowDataPacket[]>(
                `SELECT * FROM Reserva WHERE id_reserva = ?;`,
                [updateReserveDto.id_reserva]
            );

            if(results.length == 0){
                throw CustomError.badRequest("Reserva no econtrada");
            }

            const resultReserve = await MySQLConnection.query<OkPacket>(
                "UPDATE Reserva SET id_estado = ? WHERE id_reserva = ? ;",
                [updateReserveDto.id_estado, updateReserveDto.id_reserva]
            );

            return updateReserveDto.id_reserva
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
    async getZone(id_sede: number): Promise<ZoneEntity[]> {
        try {
            const results = await MySQLConnection.query<ZoneEntity[] & RowDataPacket[]>(
                "SELECT z.id_zona, z.zona, z.imagen FROM Zona z INNER JOIN Sede s ON s.id_sede = z.id_sede WHERE z.id_sede = ?" , [id_sede]
            );
            
            const zoneList = results as ZoneEntity[];

            return zoneList;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

    
}