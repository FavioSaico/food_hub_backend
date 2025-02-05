import { SharedDatasource } from '../../domain/datasources/shared.datasource';
import { HeadquartersEntity } from '../../domain/entities/headquarters-entity';
import { StateEntity } from '../../domain/entities/state-entity';
import { SharedRepository } from '../../domain/repositories/shared.repository';


export class SharedRepositoryImpl implements SharedRepository{

    constructor(
        private readonly sharedDatasource: SharedDatasource
    ){}

    getHeadquarters(): Promise<HeadquartersEntity[]> {
        return this.sharedDatasource.getHeadquarters();
    }
    getStates(): Promise<StateEntity[]> {
        return this.sharedDatasource.getStates();
    }
}