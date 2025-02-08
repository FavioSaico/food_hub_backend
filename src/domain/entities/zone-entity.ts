import { HeadquartersEntity } from "./headquarters-entity";

export class ZoneEntity{
    constructor(
        public id_zona: number,
        public sede: HeadquartersEntity,
        public zona: string,
        public imagen: string
    ){
    }
}