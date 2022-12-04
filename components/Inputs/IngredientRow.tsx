/* eslint-disable require-jsdoc */
import React, {useEffect, useState} from 'react';
import {IIngredients} from '../../interfaces/ingredient.interface';
import useDebounce from '../../useHooks/useDebounce';
import {emptyIngredient} from '../../utils/emptyStates';
import InputComboBox from './InputComboBox';


const IngredientRow = ({
  ingredients,
  deleteTableRows,
  units,
  setRowsData,
  ingredientRow,
  index,
}:
  { ingredients: IIngredients[],
    units: IIngredients['unitId'][],
    deleteTableRows: (index: number) => void,
    setRowsData: (value: React.SetStateAction<{
      ingredientId: number;
      quantity: number;
      unitId: number;
  }[]>) => void,
    ingredientRow: [{ ingredientId: number, unitId: number, quantity:number}],
    index:number
}) => {
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [unitId, setUnitId] = useState(0);
  const [ingredientId, setIngredientId] = useState(0);

  const ingredientsName = ingredients.map((ingredient) => ingredient.name);
  const [ingredient, setIngredient] = useState(emptyIngredient);
  const debounceSearchTerm = useDebounce(query, 500);


  // eslint-disable-next-line require-jsdoc
  async function searchIngredient(query : string) {
    try {
      const res= await fetch(`/api/ingredients/search/${query}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(query),
      });
      const result = await res.json();
      return result;
    } catch (e) {
      console.log(e);
    }
    return;
  }

  function generateUnit(unitId: number) {
    return units.filter((unit)=> unit.id == unitId);
  }

  useEffect(()=>{
    if (debounceSearchTerm) {
      searchIngredient(debounceSearchTerm).then( (results) =>{
        if (results[0]) {
          const units = generateUnit(results[0].unitId);

          setUnit(units[0].name);
          setUnitId(units[0].id!);
          setIngredient(results[0]);
          setIngredientId(results[0].id);
        } else {
          setIngredient(emptyIngredient);
        }
      });
    } else {
      setIngredient(emptyIngredient);
    }
  }, [debounceSearchTerm]);

  function comboBoxSearch(value: string) {
    setQuery(value);
  }

  const pricePerUnit = ingredient.price / ingredient.quantity;

  function quantityHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTimeout(()=>{
      setQuantity(parseInt(e.target.value));
    }, 500);
  }
  function updateRow() {
    setRowsData((prev)=> {
      prev[index] ={
        ingredientId: ingredientId,
        quantity: quantity,
        unitId: unitId,
      };
      console.log(prev);

      return prev;
    });
  }
  useEffect(()=>{
    return updateRow();
  }, [quantity]);

  return (
    <tr className='border-b'>
      <td>
        <InputComboBox
          list ={ingredientsName} search ={comboBoxSearch} />
      </td>
      <td>
        <label htmlFor="quantity">
          <input
            className='w-full m-2 h-7 '
            type="number"
            defaultValue={0}
            onChange = {quantityHandler}
          />
        </label>
      </td>
      <td>
        <input
          className='w-full  m-2 h-7'
          type="text"
          name="unit"
          id="unit"
          defaultValue={unit} disabled={true}
        />
      </td>
      <td>
        <input
          className='w-full m-2 h-7'
          type="text"
          name="price-per-unit"
          id="unit"
          value={`$${
            pricePerUnit ?
            pricePerUnit.toFixed(2): 0}/${unit}`}
          disabled={true}/>
      </td>
      <td>
        <input
          className='w-full m-2 h-7'
          type="text"
          name="price-per-unit"
          id="unit"
          value={`$${pricePerUnit ?
            (pricePerUnit* quantity).toFixed(2):0 }`}
          disabled={true}/>
      </td>
    </tr>


  );
};


export default IngredientRow;
