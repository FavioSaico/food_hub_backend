import { FoodEntity } from "../entities/food-entity";

export abstract class FoodDatasource{

    abstract foodList():Promise<FoodEntity[]>

}