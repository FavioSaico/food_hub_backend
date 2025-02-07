export class FoodResponseDto{
    constructor(
        public id_comida: number,
        public comida: string,
        public tipo_comida: string,
        public precio: number,
        public cantidad: number,
        public costo: number,
        public imagen: string,
    ){
    }
}