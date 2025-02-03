import { FoodEntity } from "../entities/food-entity";

export abstract class FoodRepository{

    abstract foodList():Promise<FoodEntity[]>;
}
