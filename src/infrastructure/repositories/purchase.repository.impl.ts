import { PurchaseDatasource } from '../../domain/datasources/purchase.datasource';
import { PurchaseListDto } from '../../domain/dtos/purchase-list.dto';
import { RegisterPurchaseDto } from '../../domain/dtos/purchase-register.dto';
import { UpdateStatePurchaseDto } from '../../domain/dtos/purchase-update.dto';
import { PaymentTypeEntity } from '../../domain/entities/payment-type-entity';
import { PurchaseTypeEntity } from '../../domain/entities/purchase-type-entity';
import { PurchaseRepository } from '../../domain/repositories/purchase.repository';


export class PurchaseRepositoryImpl implements PurchaseRepository{

    constructor(
        private readonly purchaseDatasource: PurchaseDatasource
    ){}
    getListPurchaseUser(id_usuario: number): Promise<PurchaseListDto[]> {
        return this.purchaseDatasource.getListPurchaseUser(id_usuario);
    }
    updateStatePurchase(updatePurchaseDto: UpdateStatePurchaseDto): Promise<number> {
        return this.purchaseDatasource.updateStatePurchase(updatePurchaseDto);
    }
    registerPurchase(registarPurchaseDto: RegisterPurchaseDto): Promise<number> {
        return this.purchaseDatasource.registerPurchase(registarPurchaseDto);
    }
    getPurchase(id:number) {
        return this.purchaseDatasource.getPurchase(id);
    }
    getListPurchase():Promise<PurchaseListDto[]>{
        return this.purchaseDatasource.getListPurchase();
    }
    getTypesPayment(): Promise<PaymentTypeEntity[]> {
        return this.purchaseDatasource.getTypesPayment();
    }
    getTypesPurchase(): Promise<PurchaseTypeEntity[]> {
        return this.purchaseDatasource.getTypesPurchase();
    }
}