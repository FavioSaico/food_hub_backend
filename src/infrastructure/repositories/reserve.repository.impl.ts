import { ReserveDatasource } from "../../domain/datasources/reserve.datasource";
import { ReserveListDto } from "../../domain/dtos/reserve-list.dto";
import { UpdateStateReserveDto } from "../../domain/dtos/reserve-update.dto";
import { RegisterReserveDto } from "../../domain/dtos/revese-register.dto";
import { ReserveEntity } from "../../domain/entities/reserve-entity";
import { ZoneEntity } from "../../domain/entities/zone-entity";
import { ReserveRepository } from "../../domain/repositories/reserve.repository";

export class ReserveRepositoryImpl implements ReserveRepository{

    constructor(
        private readonly reserverDatasource: ReserveDatasource
    ){}

    getReserve(id: number): Promise<ReserveEntity> {
        return this.reserverDatasource.getReserve(id);
    }
    getListReserve(): Promise<ReserveListDto[]> {
        return this.reserverDatasource.getListReserve();
    }
    registerReserve(registerReserveDto: RegisterReserveDto): Promise<number> {
        return this.reserverDatasource.registerReserve(registerReserveDto);
    }
    updateStateReserve(updatePurchaseDto: UpdateStateReserveDto): Promise<number> {
        return this.reserverDatasource.updateStateReserve(updatePurchaseDto);
    }
    getZone(id_sede: number): Promise<ZoneEntity[]> {
        return this.reserverDatasource.getZone(id_sede);
    }
    
    
}