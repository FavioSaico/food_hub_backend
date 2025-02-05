import { FoodDatasource } from '../../domain/datasources/food.datasource';
import { FoodEntity } from '../../domain/entities/food-entity';
import { FoodRepository } from '../../domain/repositories/food.repository';


export class FoodRepositoryImpl implements FoodRepository{

    constructor(
        private readonly foodDatasource: FoodDatasource
    ){}

    async foodList(): Promise<FoodEntity[]> {
        return this.foodDatasource.foodList();
    }
}
