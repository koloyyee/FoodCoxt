/* eslint-disable require-jsdoc */
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, {useState} from 'react';
import {IIngredients} from '../../interfaces/ingredient.interface';
import {emptyRecipe, ingredientRowState} from '../../utils/emptyStates';
import Button from '../Buttons/Button';
import IngredientRow from '../Inputs/IngredientRow';


const FoodCostCard= (
    {ingredients, units, suppliers, categories, types}:{
        ingredients: IIngredients[]
        units: IIngredients['unitId'][]
        suppliers: IIngredients['supplierId'][]
        categories: IIngredients['categoryId'][]
        types: IIngredients['typeId'][]
      }) => {
  const [rowsData,
    setRowsData] = useState([ingredientRowState]);
  const [recipe, setRecipe] = useState([emptyRecipe]);

  //  const first = useContext(second)

  function submitForm(e: React.FormEvent ) {
    e.preventDefault();
    console.log(rowsData);
  }

  const addTableRow=(e: React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setRowsData((prev)=>{
      return [...prev, ingredientRowState];
    });
  };
  const deleteTableRows=(index: number)=>{
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  return (
    <div className='flex'>
      <form className='rounded-xl'>
        <table className='table-fixed'>
          <thead>
            <tr>
              <th> Ingredient Name</th>
              <th> Quantity</th>
              <th> Unit</th>
              <th> Price Per Unit</th>
              <th> Subtotal Cost</th>
            </tr>
          </thead>
          <tbody>
            {rowsData.map((row, index)=>{
              return (
                <IngredientRow
                  key={index}
                  index={index}
                  ingredients = {ingredients}
                  units={units}
                  deleteTableRows={deleteTableRows}
                  setRowsData={setRowsData}
                  ingredientRow ={[ingredientRowState]}
                />

              );
            })}
          </tbody>
        </table>
        <Button text={' New Recipe'} onClick={submitForm}/>

      </form>
      <div className=''>
        <Button text={'+'} onClick={addTableRow}/>
      </div>

    </div>

  );
};


export default FoodCostCard;


