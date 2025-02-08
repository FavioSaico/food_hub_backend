import { HeadquartersEntity } from "../entities/headquarters-entity";
import { StateEntity } from "../entities/state-entity";

export class ReserveListDto{
    constructor(
        public id_reserva: number,
        public id_usuario: number,
        public sede: HeadquartersEntity,
        public estado: StateEntity,
        public fecha: Date
    ){
    }
}