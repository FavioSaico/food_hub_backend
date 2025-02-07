import { PurchaseDatasource } from '../../domain/datasources/purchase.datasource';
import { RegisterPurchaseDto } from '../../domain/dtos/purchase-register.dto';
import { PaymentTypeEntity } from '../../domain/entities/payment-type-entity';
import { PurchaseTypeEntity } from '../../domain/entities/purchase-type-entity';
import { PurchaseRepository } from '../../domain/repositories/purchase.repository';


export class PurchaseRepositoryImpl implements PurchaseRepository{

    constructor(
        private readonly purchaseDatasource: PurchaseDatasource
    ){}
    registerPurchase(registarPurchaseDto: RegisterPurchaseDto): Promise<number> {
        return this.purchaseDatasource.registerPurchase(registarPurchaseDto);
    }
    getPurchase(id:number) {
        return this.purchaseDatasource.getPurchase(id);
    }
    getTypesPayment(): Promise<PaymentTypeEntity[]> {
        return this.purchaseDatasource.getTypesPayment();
    }
    getTypesPurchase(): Promise<PurchaseTypeEntity[]> {
        return this.purchaseDatasource.getTypesPurchase();
    }
}