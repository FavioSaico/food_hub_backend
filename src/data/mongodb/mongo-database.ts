import mongoose from "mongoose";

// Opciones de la conexión con mongo
interface Options{
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase{
    static async connect(options: Options){
        const {dbName, mongoUrl} = options;

        try {
            await mongoose.connect(mongoUrl,{
                dbName: dbName,
            })
            console.log('Mongodb connected');

        }catch (error){
            console.log('Mongodb connection error');
            throw error;
        }
    }
}