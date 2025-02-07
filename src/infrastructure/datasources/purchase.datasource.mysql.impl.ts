import { CustomError, UserEntity } from '../../domain';
import MySQLConnection from "../../data/mysql/mysql-adapter";
import { ResultSetHeader, RowDataPacket, OkPacket } from 'mysql2/promise';
import { PurchaseDatasource } from '../../domain/datasources/purchase.datasource';
import { PaymentTypeEntity } from '../../domain/entities/payment-type-entity';
import { PurchaseTypeEntity } from '../../domain/entities/purchase-type-entity';
import { PurchaseEntity } from '../../domain/entities/purchase-entity';
import { FoodEntity } from '../../domain/entities/food-entity';
import { StateEntity } from '../../domain/entities/state-entity';
import { HeadquartersEntity } from '../../domain/entities/headquarters-entity';
import { RegisterPurchaseDto } from '../../domain/dtos/purchase-register.dto';
import { UpdateStatePurchaseDto } from '../../domain/dtos/purchase-update.dto';
import { FoodResponseDto } from '../../domain/dtos/food-response-detail.dto';
import { UserResponseDto } from '../../domain/dtos/user-response.dto';

export class PurchaseDatasourceMysqlImpl implements PurchaseDatasource {

    constructor(){
    }
    async getPurchase(id: number):Promise<PurchaseEntity> {
        try {
            console.log('antes');
            const results = await MySQLConnection.query<RowDataPacket[]>(
                `
                SELECT c.id_compra,c.id_usuario,c.id_tipo_compra,c.id_tipo_pago,c.id_estado,
                c.id_sede,c.costo_subtotal,c.costo_total,c.costo_delivery,
                u.tipo_usuario,u.nombre,u.correo,u.direccion,
                tc.tipo_compra,tp.tipo_pago,e.tipo_estado,s.sede,
                dc.id_comida,dc.cantidad,dc.costo,
                co.comida,co.tipo_comida,co.precio,co.imagen
                FROM Compra c
                INNER JOIN Usuario u on u.id_usuario = c.id_usuario
                INNER JOIN Tipo_Compra tc on tc.id_tipo_compra = c.id_tipo_compra
                INNER JOIN Tipo_Pago tp on tp.id_tipo_pago = c.id_tipo_pago
                INNER JOIN Estado e on e.id_estado = c.id_estado
                INNER JOIN Sede s on s.id_sede = c.id_sede
                INNER JOIN Detalle_Compra dc on dc.id_compra = c.id_compra
                INNER JOIN Comida co on co.id_comida = dc.id_comida
                WHERE c.id_compra = ?;
                `, 
                [id]
            );
            
            let listFood : FoodResponseDto[] = [];
            results.forEach( (v)=> {
                listFood.push(new FoodResponseDto(
                    v['id_comida'],
                    v['comida'],
                    v['tipo_comida'],
                    Number(v['precio']),
                    Number(v['cantidad']),
                    Number(v['costo']),
                    v['imagen'],
                ));
            });

            const purchase = new PurchaseEntity (
                Number(results[0]['id_compra']),
                new UserResponseDto(
                    results[0]['id_usuario'],
                    results[0]['tipo_usuario'],
                    results[0]['nombre'],
                    results[0]['correo'],
                    results[0]['direccion']
                ),
                new PurchaseTypeEntity(results[0]['id_tipo_compra'],results[0]['tipo_compra']),
                new PaymentTypeEntity(results[0]['id_tipo_pago'],results[0]['tipo_pago']),
                new StateEntity(results[0]['id_estado'],results[0]['tipo_estado']),
                new HeadquartersEntity(results[0]['id_sede'],results[0]['sede']),
                Number(results[0]['costo_subtotal']),
                Number(results[0]['costo_total']),
                Number(results[0]['costo_delivery']),
                listFood,
            );
            // console.log(purchase)
            return purchase;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    };
    async registerPurchase(registarPurchaseDto: RegisterPurchaseDto):Promise<number> {
        try {
        
            const resultPurchase = await MySQLConnection.query<ResultSetHeader>(
                `
                INSERT INTO Compra (id_usuario,id_tipo_compra,id_tipo_pago,id_estado,id_sede,
                costo_subtotal,costo_total,costo_delivery)
                    VALUES (?,?,?,?,?,?,?,?);
                `,
                [registarPurchaseDto.id_usuario, registarPurchaseDto.id_tipo_compra, registarPurchaseDto.id_tipo_pago, registarPurchaseDto.id_estado,
                    registarPurchaseDto.id_sede, registarPurchaseDto.costo_subtotal, registarPurchaseDto.costo_total, registarPurchaseDto.costo_delivery
                ]
            );

            // let sqlString = 'INSERT INTO Detalle_Compra (id_compra,id_comida,cantidad,costo) VALUES ';
            registarPurchaseDto.lista_comidas.forEach( async (v)=>{

                // sqlString += '(' + resultPurchase.insertId + ',';
                await MySQLConnection.query<ResultSetHeader>(
                    `
                    INSERT INTO Detalle_Compra (id_compra,id_comida,cantidad,costo) VALUES (?,?,?,?);
                    `,
                    [resultPurchase.insertId, v.id_comida, v.cantidad, v.costo]
                );
            })

            return resultPurchase.insertId;
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
    };

    async updateStatePurchase(updatePurchaseDto: UpdateStatePurchaseDto):Promise<number>{

        try {
        
            const resultPurchase = await MySQLConnection.query<OkPacket>(
                "UPDATE Compra SET id_estado = ? WHERE id_compra = ? ;",
                [updatePurchaseDto.id_estado, updatePurchaseDto.id_compra]
            );

            return updatePurchaseDto.id_compra
        }
        catch (error) {
            if (error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServer();
        }
        
    };

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