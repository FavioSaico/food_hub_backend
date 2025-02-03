import mongoose from "mongoose";
import mysql from "mysql2/promise";

// Opciones de la conexión con mongo
interface Options{
    host: string;
    user: string;
    dbName: string;
    password: string;
}

export class MysqlDatabase{
    static async connect(options: Options): Promise<mysql.Connection>{
        const {host,user, dbName, password} = options;

        try {
            const connection = await mysql.createConnection({
                host: host,
                user: user,
                database: dbName,
                password: password,
                typeCast: function (field, next) {
                    if (field.type === 'NEWDECIMAL') {
                        return Number(field.string());
                    }
                    return next();
                }
            });
            console.log('MySQL connected');
            return connection;
        }catch (error){
            console.log('MySQLconnection error');
            throw error;
        }
    }
}