import { HeadquartersEntity } from "../entities/headquarters-entity";
import { StateEntity } from "../entities/state-entity";

export abstract class SharedDatasource{
    // obtener sedes
    abstract getHeadquarters():Promise<HeadquartersEntity[]>;
    // Obtener estados
    abstract getStates():Promise<StateEntity[]>
}