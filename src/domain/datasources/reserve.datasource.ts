import { ReserveListDto } from "../dtos/reserve-list.dto";
import { UpdateStateReserveDto } from "../dtos/reserve-update.dto";
import { RegisterReserveDto } from "../dtos/revese-register.dto";
import { ReserveEntity } from "../entities/reserve-entity";
import { ZoneEntity } from "../entities/zone-entity";

export abstract class ReserveDatasource{

    abstract getReserve(id: number):Promise<ReserveEntity>;

    abstract getListReserve():Promise<ReserveListDto[]>;

    abstract registerReserve(registaReserveDto: RegisterReserveDto):Promise<number>;

    abstract updateStateReserve(updatePurchaseDto: UpdateStateReserveDto):Promise<number>;

    abstract getZone():Promise<ZoneEntity[]>;
}