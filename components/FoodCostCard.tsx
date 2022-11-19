import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AgGridReact} from 'ag-grid-react';
import React, {useMemo, useState} from 'react';
import {IngredientsInterface} from '../interfaces/ingredient.interface';
import styles from '../styles/Card.module.css';
import Button from './Button';
import IngredientRow from './IngredientRow';

const emptyState = {
  code: '',
  name: '',
  packingSize: '',
  quantity: 0,
  price: 0,
  type: {name: ''},
  category: {name: ''},
  unit: {name: ''},
  supplier: {name: 'Food Factory'},

};

const FoodCostCard= (
    {ingredients, units, suppliers, categories, types}:{
        ingredients: IngredientsInterface[]
        units: IngredientsInterface['unit'][]
        suppliers: IngredientsInterface['supplier'][]
        categories: IngredientsInterface['category'][]
        types: IngredientsInterface['type'][]
      }) => {
  const names = ingredients.map((ingredient) => ingredient.name);
  const unit = units.map((unit) => unit.name);

  // const [gridApi, setGridApi] = useState(null);
  const [ingredient, setIngredient] = useState<
  IngredientsInterface>(emptyState);
  const [data, setData] = useState<IngredientsInterface[]>([emptyState]);
  const [price, setPrice] = useState<IngredientsInterface['price']>(0);


  const [columnDefs] = useState([
    {field: 'name',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['', ...names],
      },
    },
    {headerName: 'ingredient',
      // field: 'name',
      // cellEditor: IngredientEditor,
      cellEditorPopup: true,
      editable: true,

    },
    {field: 'quantity',
    },
    {field: 'unit.name',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['', ...unit],
      }},

  ]);

  const defaultColDef = useMemo(()=>{
    return {
      editable: true,
    };
  }, []);

  const callValue = (e)=>{

  };


  const submitHandler = async (
      e: React.KeyboardEventHandler<HTMLInputElement>)=>{
    // eslint-disable-next-line require-jsdoc


    const query = (e.currentTarget.value);
    console.log(query);
    if (query) {
      try {
        const res = await fetch(`api/ingredients/search/${query}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(query),
        });
        const result = await res.json();
        console.log(result);
        setPrice(result[0].price);
        setIngredient(result[0]);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <form>
      <section className={styles.section}>
        <label htmlFor="code" className={styles.label} >
        Code
          <input className={styles.input} type="text" name="code" id="code" />
        </label>
        <label htmlFor="name" className={styles.label} >
        Name
          <input className={styles.input} type="text" name="name" id="name" />
        </label>
        <label htmlFor="type" className={styles.label} >
        Type
          <select
            defaultValue={'-- select an option --'}
          >
            <option value="-- select an option --">
              -- select an option --</option>
            {types?.map((type) =>(
              <option key={type.name}
                defaultValue={type.name}>{type.name}</option>
            ))}
          </select>
        </label>
      </section>
      <Button text={'Create Recipe'} />
      <section className="ag-theme-alpine"
        style={{height: 400, width: '100%'}}>
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          // onGridReady={onGridReady}
        >
        </AgGridReact>
        <IngredientRow/>
      </section>
    </form>
  );
};

export default FoodCostCard;


