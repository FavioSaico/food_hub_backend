// src/infrastructure/database/mysql-datasource.ts
// import MySQLConnection from "./mysql-connection";
import { RowDataPacket, ResultSetHeader, OkPacket, Connection } from "mysql2/promise";
import { MysqlDatabase } from "./mysql-database";
import { envs } from "../../config";

class MySQLConnection {
    async query<T extends RowDataPacket[] | ResultSetHeader | OkPacket>(sql: string, params: any[] = []): Promise<T> {
        let connection: Connection | null = null;
        sql = sql.toLowerCase();
        try {
            connection = await MysqlDatabase.connect({
                host: envs.MYSQL_HOST,
                user: envs.MYSQL_USER,
                dbName: envs.MYSQL_DB_NAME,
                password: envs.MYSQL_PASS
            });
            const [results] = await connection.execute<T>(sql, params);
            
            return results;
        } finally {
            if (connection) {
                await connection.end(); // Cierra la conexión después de la consulta
            }
        }
    }
}

export default new MySQLConnection();