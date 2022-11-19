import {useEffect, useState} from 'react';
import {IngredientsInterface} from '../interfaces/ingredient.interface';
import useDebounce from '../useHooks/useDebounce';


const emptyState: IngredientsInterface ={
  code: '',
  name: '',
  packingSize: '',
  price: 0,
  quantity: 0,
  unit: {name: ''},
  type: {name: ''},
  category: {name: ''},
  supplier: {name: ''},
};


const IngredientRow = () => {
  const [query, setQuery] = useState('');
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
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
    return;
  }

  useEffect(()=>{
    if (debounceSearchTerm) {
      searchIngredient(debounceSearchTerm).then( (results) =>{
        setIngredient(results[0]);
      });
    } else {
      setIngredient([]);
    }
  }, [debounceSearchTerm]);

  return (
    <label htmlFor="ingredient-search">
      <input
        type="text"
        defaultValue={''}
        onChange={(e)=> setQuery(e.target.value.trim().toLowerCase())}/>
      <p>{ingredient.name}</p>
      <p>{ingredient.price / ingredient.quantity ?
      ingredient.price / ingredient.quantity :'' }</p>
    </label>
  );
};

export default IngredientRow;
