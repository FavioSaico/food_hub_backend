import { SharedDatasource } from "../../domain/datasources/shared.datasource";
import { HeadquartersEntity } from "../../domain/entities/headquarters-entity";
import { StateEntity } from "../../domain/entities/state-entity";
import MySQLConnection from "../../data/mysql/mysql-adapter";
import { RowDataPacket } from "mysql2";
import { CustomError } from "../../domain";

export class SharedDatasourceMysqlImpl implements SharedDatasource{

    constructor(){
    }

    // obtener sedes
    async getHeadquarters():Promise<HeadquartersEntity[]>{
        try {
        
            const results = await MySQLConnection.query<HeadquartersEntity[] & RowDataPacket[]>(
                "SELECT * FROM Sede"
            );

            const typesPaymentList = results as HeadquartersEntity[];

            return typesPaymentList;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    };
    // Obtener estados
    async getStates():Promise<StateEntity[]> {
        try {
        
            const results = await MySQLConnection.query<StateEntity[] & RowDataPacket[]>(
                "SELECT * FROM Estado"
            );

            const typesPaymentList = results as StateEntity[];

            return typesPaymentList;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}