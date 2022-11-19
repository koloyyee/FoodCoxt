/* eslint-disable require-jsdoc */
import {useEffect, useState} from 'react';
import {IngredientsInterface} from '../interfaces/ingredient.interface';
import useDebounce from '../useHooks/useDebounce';
import {emptyState} from './FoodCostCard';
import InputComboBox from './InputComboBox';


const IngredientRow = ({ingredients, deleteTableRows, units}:
  { ingredients: IngredientsInterface[],
    units: IngredientsInterface['unitId'][],
    deleteTableRows: (index: number) => void,
}) => {
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');

  const ingredientsName = ingredients.map((ingredient) => ingredient.name);
  const [ingredient, setIngredient] = useState(emptyState);
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

  function generateUnit(ingredientId: number) {
    return units.filter((unit)=> unit.id == ingredientId);
  }

  useEffect(()=>{
    if (debounceSearchTerm) {
      searchIngredient(debounceSearchTerm).then( (results) =>{
        const units = generateUnit(results[0].unitId);
        setUnit(units[0].name);
        setIngredient(results[0]);
      });
    } else {
      setIngredient(emptyState);
    }
  }, [debounceSearchTerm]);

  function onChange(value: string) {
    setQuery(value);
  }


  return (
    <tr>
      <td>
        <InputComboBox
          list ={ingredientsName} search ={onChange} />
      </td>
      <td>
        <label htmlFor="quantity">
          <input
            type="number"
            defaultValue={0}
            onChange = {(e)=> setQuantity(Number(e.target.value))}
          />
        </label>
      </td>
      <td>
        <p>{unit}</p>
      </td>
      <td>
        <p>{ingredient.price}/{unit}</p>
      </td>
      <td>
        {(ingredient.price / ingredient.quantity)* quantity ?
    (ingredient.price / ingredient.quantity)* quantity : '' }
      </td>
    </tr>


  );
};


export default IngredientRow;
