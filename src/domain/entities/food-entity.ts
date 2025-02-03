export class FoodEntity{
    constructor(
        public id_comida: number,
        public comida: string,
        public tipo_comida: string,
        public descripcion: string,
        public tiempo: string,
        public precio: number,
        public imagen: string,
    ){
    }
}