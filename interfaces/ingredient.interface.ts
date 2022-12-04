import {ICategory} from './category.interface';
import {ISupplier} from './supplier.interface';
import {IType} from './type.interface';
import {IUnit} from './unit.interface';

export interface IIngredients{
    id?: number
    code: string
    name: string
    packingSize: string
    price: number
    quantity: number
    unitId: IUnit
    typeId:IType
    categoryId: ICategory
    supplierId: ISupplier
};

