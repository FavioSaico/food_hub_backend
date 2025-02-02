import { envs } from "./config";
// import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server"
// import * as newrelic from 'newrelic';
(()=>{
    main()
})()

async function main() {
    // conectamos la base de datos
    // await MongoDatabase.connect({
    //     mongoUrl:envs.MONGO_URL,
    //     dbName: envs.MONGO_DB_NAME
    // })

    // servidor
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    }).start();
}
