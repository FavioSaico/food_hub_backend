import { CustomError } from '../../domain';
import MySQLConnection from "../../data/mysql/mysql-adapter";
import { RowDataPacket } from 'mysql2/promise';
import { FoodDatasource } from '../../domain/datasources/food.datasource';
import { FoodEntity } from '../../domain/entities/food-entity';


export class FoodDatasourceMysqlImpl implements FoodDatasource{
    constructor(){
    }

    async foodList(): Promise<FoodEntity[]> {

        try {

            const results = await MySQLConnection.query<FoodEntity[] & RowDataPacket[]>(
                "SELECT * FROM comida"
            );

            const foodList = results as FoodEntity[];

            return foodList;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }
}

