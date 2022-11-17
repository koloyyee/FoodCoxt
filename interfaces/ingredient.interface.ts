export interface IngredientsInterface {
    id?: number
    code: string
    name: string
    packingSize: string
    price: number
    quantity: number
    unit:{name: string}
    type:{name: string}
    category: {name: string}
    supplier: {name: string}
};
