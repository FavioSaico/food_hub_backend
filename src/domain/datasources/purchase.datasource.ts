import { PurchaseListDto } from "../dtos/purchase-list.dto";
import { RegisterPurchaseDto } from "../dtos/purchase-register.dto";
import { UpdateStatePurchaseDto } from "../dtos/purchase-update.dto";
import { PaymentTypeEntity } from "../entities/payment-type-entity";
import { PurchaseEntity } from "../entities/purchase-entity";
import { PurchaseTypeEntity } from "../entities/purchase-type-entity";

export abstract class PurchaseDatasource{

    abstract getPurchase(id: number):Promise<PurchaseEntity>;

    abstract getListPurchase():Promise<PurchaseListDto[]>;

    abstract registerPurchase(registarPurchaseDto: RegisterPurchaseDto):Promise<number>;

    abstract updateStatePurchase(updatePurchaseDto: UpdateStatePurchaseDto):Promise<number>;

    abstract getTypesPayment():Promise<PaymentTypeEntity[]>;

    abstract getTypesPurchase():Promise<PurchaseTypeEntity[]>
}