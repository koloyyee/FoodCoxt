import {CategoryInterface} from './category.interface';
import {SupplierInterface} from './supplier.interface';
import {TypeInterface} from './type.interface';
import {UnitInterface} from './unit.interface';

export interface IngredientsInterface {
    id?: number
    code: string
    name: string
    packingSize: string
    price: number
    quantity: number
    unitId: UnitInterface
    typeId:TypeInterface
    categoryId: CategoryInterface
    supplierId: SupplierInterface
};

