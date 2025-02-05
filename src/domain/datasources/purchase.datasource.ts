import { PaymentTypeEntity } from "../entities/payment-type-entity";
import { PurchaseTypeEntity } from "../entities/purchase-type-entity";

export abstract class PurchaseDatasource{

    abstract getTypesPayment():Promise<PaymentTypeEntity[]>;

    abstract getTypesPurchase():Promise<PurchaseTypeEntity[]>
}