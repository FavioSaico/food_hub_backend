import { PaymentTypeEntity } from "../entities/payment-type-entity";
import { PurchaseEntity } from "../entities/purchase-entity";
import { PurchaseTypeEntity } from "../entities/purchase-type-entity";

export abstract class PurchaseRepository{

    abstract getPurchase(id: number):Promise<PurchaseEntity>;
    abstract getTypesPayment():Promise<PaymentTypeEntity[]>;
    abstract getTypesPurchase():Promise<PurchaseTypeEntity[]>;
}
