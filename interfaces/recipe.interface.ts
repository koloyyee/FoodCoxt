import {IIngredients} from './ingredient.interface';
import {IType} from './type.interface';
import {IUnit} from './unit.interface';

export interface IRecipe {
    id?:number,
    name: string,
    typeId: IType['id'],
    ingredientOnRecipe: {
        ingredientId: IIngredients['id'],
        recipeId?: IIngredients['id'],
        quantity: IUnit['id'],
      },
      totalInput: number,
      totalOutput: number,
      yield: number,
      servingNumber: number,
      servingQuantity: number,
      pricePerUnit: number,
      pricePerServing: number,
      totalCost: number,
}

export interface IIngredientOnRecipe{
    ingredientId : IIngredients['id'],
    recipeId?: IRecipe['id'],
    quantity: number,
    unitId: IUnit['id']
}
