import { CustomError } from '../../domain';
import MySQLConnection from "../../data/mysql/mysql-adapter";
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { PurchaseDatasource } from '../../domain/datasources/purchase.datasource';
import { PaymentTypeEntity } from '../../domain/entities/payment-type-entity';
import { PurchaseTypeEntity } from '../../domain/entities/purchase-type-entity';

export class PurchaseDatasourceMysqlImpl implements PurchaseDatasource {

    constructor(){
    }

    async getTypesPayment():Promise<PaymentTypeEntity[]> {
        try {
        
            const results = await MySQLConnection.query<PaymentTypeEntity[] & RowDataPacket[]>(
                "SELECT * FROM Tipo_Pago"
            );

            const typesPaymentList = results as PaymentTypeEntity[];

            return typesPaymentList;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    };
    
    async getTypesPurchase():Promise<PurchaseTypeEntity[]> {
        try {
        
            const results = await MySQLConnection.query<PurchaseTypeEntity[] & RowDataPacket[]>(
                "SELECT * FROM Tipo_Compra"
            );

            const typesPurchaseList = results as PurchaseTypeEntity[];

            return typesPurchaseList;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    }

}