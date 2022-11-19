/* eslint-disable require-jsdoc */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, {useState} from 'react';
import {IngredientsInterface} from '../interfaces/ingredient.interface';
import IngredientRow from './IngredientRow';

export const emptyState = {
  code: '',
  name: '',
  packingSize: '',
  quantity: 0,
  price: 0,
  unitId: {id: 0, name: ''},
  typeId: {id: 0, name: ''},
  categoryId: {id: 0, name: ''},
  supplierId: {id: 0, name: 'Food Factory', email: '', phone: ''},

};

const FoodCostCard= (
    {ingredients, units, suppliers, categories, types}:{
        ingredients: IngredientsInterface[]
        units: IngredientsInterface['unitId'][]
        suppliers: IngredientsInterface['supplierId'][]
        categories: IngredientsInterface['categoryId'][]
        types: IngredientsInterface['typeId'][]
      }) => {
  const [rowsData,
    setRowsData] = useState<IngredientsInterface[]>([emptyState]);

  const addTableRow=(e: React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setRowsData([...rowsData, emptyState]);
  };
  const deleteTableRows=(index: number)=>{
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  return (
    <form>
      <table >
        <thead>
          <tr>
            <th> Ingredient Name</th>
            <th> Quantity</th>
            <th> Unit</th>
            <th> Price Per Unit</th>
            <th> Subtotal Cost</th>
            <th> <button onClick={addTableRow}>+</button></th>
          </tr>
        </thead>
        <tbody>
          {rowsData.map((row, index)=>{
            return (
              <IngredientRow
                key={index}
                ingredients = {ingredients}
                units={units}
                deleteTableRows={deleteTableRows} />

            );
          })}
        </tbody>
      </table>
    </form>
  );
};


export default FoodCostCard;


