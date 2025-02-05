import { HeadquartersEntity } from "../entities/headquarters-entity";
import { StateEntity } from "../entities/state-entity";

export abstract class SharedRepository{
    // obtener sedes
    abstract getHeadquarters():Promise<HeadquartersEntity[]>;
    // Obtener estados
    abstract getStates():Promise<StateEntity[]>
}
