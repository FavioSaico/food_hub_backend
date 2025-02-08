import { HeadquartersEntity } from "../entities/headquarters-entity";
import { PaymentTypeEntity } from "../entities/payment-type-entity";
import { PurchaseTypeEntity } from "../entities/purchase-type-entity";
import { StateEntity } from "../entities/state-entity";

export class PurchaseListDto{
    constructor(
        public id_compra: number,
        public id_usuario: number,
        public tipo_compra: PurchaseTypeEntity,
        public tipo_pago: PaymentTypeEntity,
        public estado: StateEntity,
        public sede: HeadquartersEntity,
        public costo_total: number,
        public fecha: Date,
    ){
    }
}