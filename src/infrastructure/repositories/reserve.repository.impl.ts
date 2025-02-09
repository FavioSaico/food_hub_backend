import { ReserveDatasource } from "../../domain/datasources/reserve.datasource";
import { ReserveListDto } from "../../domain/dtos/reserve-list.dto";
import { UpdateStateReserveDto } from "../../domain/dtos/reserve-update.dto";
import { RegisterReserveDto } from "../../domain/dtos/revese-register.dto";
import { ReserveEntity } from "../../domain/entities/reserve-entity";
import { ZoneEntity } from "../../domain/entities/zone-entity";
import { ReserveRepository } from "../../domain/repositories/reserve.repository";

export class ReserveRepositoryImpl implements ReserveRepository{

    constructor(
        private readonly reserveDatasource: ReserveDatasource
    ){}

    getListReserveUser(id_usuario: number): Promise<ReserveListDto[]> {
        return this.reserveDatasource.getListReserveUser(id_usuario);
    }

    getReserve(id: number): Promise<ReserveEntity> {
        return this.reserveDatasource.getReserve(id);
    }
    getListReserve(): Promise<ReserveListDto[]> {
        return this.reserveDatasource.getListReserve();
    }
    registerReserve(registerReserveDto: RegisterReserveDto): Promise<number> {
        return this.reserveDatasource.registerReserve(registerReserveDto);
    }
    updateStateReserve(updatePurchaseDto: UpdateStateReserveDto): Promise<number> {
        return this.reserveDatasource.updateStateReserve(updatePurchaseDto);
    }
    getZone(id_sede: number): Promise<ZoneEntity[]> {
        return this.reserveDatasource.getZone(id_sede);
    }
    
    
}