import { FoodResponseDto } from "../dtos/food-response-detail.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import { FoodEntity } from "./food-entity";
import { HeadquartersEntity } from "./headquarters-entity";
import { PaymentTypeEntity } from "./payment-type-entity";
import { PurchaseTypeEntity } from "./purchase-type-entity";
import { StateEntity } from "./state-entity";
import { UserEntity } from "./user-entity";

export class PurchaseEntity{
    constructor(
        public id_compra: number,
        public usuario: UserResponseDto,
        public tipo_compra: PurchaseTypeEntity,
        public tipo_pago: PaymentTypeEntity,
        public estado: StateEntity,
        public id_sede: HeadquartersEntity,
        public costo_subtotal: number,
        public costo_total: number,
        public costo_delivery: number,
        public lista_comidas: FoodResponseDto[]
    ){
    }
}