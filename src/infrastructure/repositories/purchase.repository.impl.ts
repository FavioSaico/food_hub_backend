import { PurchaseDatasource } from '../../domain/datasources/purchase.datasource';
import { PaymentTypeEntity } from '../../domain/entities/payment-type-entity';
import { PurchaseTypeEntity } from '../../domain/entities/purchase-type-entity';
import { PurchaseRepository } from '../../domain/repositories/purchase.repository';


export class PurchaseRepositoryImpl implements PurchaseRepository{

    constructor(
        private readonly purchaseDatasource: PurchaseDatasource
    ){}
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