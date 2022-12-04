import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {IIngredients} from '../../interfaces/ingredient.interface';
import {default as styles} from '../../styles/Card.module.css';
import Button from '../Buttons/Button';

/**
 *
 * @param {number} price - ingredient price
 * @param {number} quantity - ingredient quantity
 * @return {React.Component} - Rerender Price per unit
 */
function PricePerUnit({price, quantity}:{
  price: number
  quantity: number
}) {
  return (
    <input className={styles.input} type="text" name="price-per-unit"
      id="price-per-unit"
      defaultValue={
        price/quantity?( price/quantity).toFixed(3) :0
      } disabled={true}/>
  );
}

const IngredientCard = (
    {ingredient, units, suppliers, categories, types, isNew} :
    {ingredient:IIngredients,
      units:IIngredients['unitId'][],
      suppliers:IIngredients['supplierId'][]
      categories:IIngredients['categoryId'][]
      types:IIngredients['typeId'][]
      isNew: boolean // is this a new ingredient?
    },
) => {
  const [data, setData] = useState<IIngredients>({...ingredient});

  const [inputDisable, setInputDisable] = useState(true);

  useEffect(()=>setInputDisable(!isNew), []);
  const router = useRouter();


  /**
   *
   * @param {React.FormEvent} e
   * editMode to switch the form into editable form enable input
   */
  function editMode(e: React.SyntheticEvent) {
    e.preventDefault();
    setInputDisable(!inputDisable);
  }

  // eslint-disable-next-line require-jsdoc
  async function updateForm(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const body = data;
      const id = body.id;
      await fetch(`/api/ingredients/update/${id}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    }
    setInputDisable(!inputDisable);
  }

  // eslint-disable-next-line require-jsdoc
  async function createForm(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      const body = data;
      await fetch(`/api/ingredients/create`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    }
    setInputDisable(!inputDisable);
    router.back();
  }

  return (
    <article className='section'>
      {isNew? <h1>Add New Ingredient</h1> : <h1>Update Ingredient</h1>}
      <form className='
      w-2/3 shadow-lg rounded m-auto
      grid grid-cols-3'>
        <label htmlFor="code" className={styles.label}>
        Code
          <input
            className={styles.input}
            type="text"
            name="code"
            id='code'
            defaultValue={data.code}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value.toLowerCase()},
            )}
            disabled={inputDisable}
            required={true}/>
        </label>
        <label htmlFor="name" className={styles.label}>
        Name
          <input
            className={styles.input}
            type="text"
            name="name"
            id='name'
            defaultValue={data.name}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value.toLowerCase().trim()},
            )}
            disabled={inputDisable}
            required={true} />
        </label>
        <label htmlFor="category" className={styles.label}>
        Category
          <select
            className={styles.input}
            name="category"
            id='category'
            defaultValue={isNew ?
              '-- select an option --' : data.categoryId.name}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value},
            )}
            disabled={inputDisable}
            required={true}>
            <option
              disabled
              value='-- select an option --'> -- select an option -- </option>
            {categories.map((category, index)=>(
              <option key={index} value={category.name}>{category.name}</option>
            ))}
          </select>
        </label>

        <label htmlFor="price" className={styles.label}>
        Price
          <input
            className={styles.input}
            type="number"
            name="price"
            min={0}
            id="price"
            defaultValue={data.price}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: Math.abs(parseInt(e.target.value))},
            )}
            disabled={inputDisable}
            required={true}/>
        </label>

        <label htmlFor="quantity" className={styles.label}>
        Quantity
          <input
            className={styles.input}
            type="number" name="quantity"
            min={0}
            id="quantity"
            defaultValue={data.quantity}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: Math.abs(parseInt(e.target.value))},
            )}
            disabled={inputDisable}
            required={true}/>
        </label>

        <label htmlFor="unit" className={styles.label}>
        Unit
          <select
            className={styles.input}
            name="unit"
            id="unit"
            defaultValue={isNew ? '-- select an option --' : data.unitId.name}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value},
            )}
            disabled={inputDisable}>
            <option
              disabled
              value=
                '-- select an option --'
            > -- select an option -- </option>
            {units.map((unit, index)=>(
              <option key={index} value={unit.name}>{unit.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.label} htmlFor="packing-size">
          Packing size
          <input
            className={styles.input}
            type="text"
            name="packingSize"
            id="packing-size"
            defaultValue={data.packingSize}
            disabled={inputDisable}
            onChange={((e)=>
              setData(
                  {...data,
                    [e.target.name]: e.target.value.toLowerCase().trim()},
              ))} />

        </label>
        <label htmlFor="price-per-unit" className={styles.label}>
        Price per Unit
          <PricePerUnit
            price={data.price}
            quantity={data.quantity}
          />
        </label>

        <label htmlFor="supplier" className={styles.label}>
        Supplier
          <select
            className={styles.input}
            name="supplier"
            id="supplier"
            defaultValue={isNew ?
              '-- select an option --' : data.supplierId.name}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value},
            )}
            disabled={inputDisable}
            required={true}>
            <option
              disabled
              value='-- select an option --'> -- select an option -- </option>
            {suppliers.map((supplier, index) =>(

              <option key={index} value={supplier.name}>{supplier.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="type" className={styles.label}>
        Type
          <select
            className={styles.input}
            name="type"
            id="type"
            defaultValue={isNew ? '-- select an option --' : data.typeId.name}
            onChange={(e)=> setData(
                {...data,
                  [e.target.name]: e.target.value},
            )}
            disabled={inputDisable}
            required={true}>
            <option
              disabled
              value='-- select an option --'> -- select an option -- </option>
            {types.map((type, index) =>(

              <option key={index} value={type.name}>{type.name}</option>
            ))}
          </select>
        </label>

        {
          isNew? <Button text='Save' onClick={createForm}/>:
         inputDisable?
         <Button text='Edit'onClick={editMode} /> :
         <Button text='Update' onClick={updateForm}/>
        }

      </form>

      <Button text='Back' onClick={()=>router.back()}/>
    </article>

  );
};

export default IngredientCard;
