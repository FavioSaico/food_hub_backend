import { UserResponseDto } from "../dtos/user-response.dto";
import { HeadquartersEntity } from "./headquarters-entity";
import { StateEntity } from "./state-entity";
import { ZoneEntity } from "./zone-entity";

export class ReserveEntity{
    constructor(
        public id_reserva: number,
        public usuario: UserResponseDto,
        public sede: HeadquartersEntity,
        public estado: StateEntity,
        public zona: ZoneEntity,
        public fecha: Date,
        public cantidad_personas: number,
        public requerimientos: string,
    ){
    }
}