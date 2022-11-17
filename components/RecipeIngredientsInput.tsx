import {IngredientsInterface} from '../interfaces/ingredient.interface';
import styles from '../styles/Input.module.css';

const RecipeIngredientsInput = (
    {ingredients}: {ingredients: IngredientsInterface[]},
) => {
  return (
    // create table
    <table>
      <thead></thead>

      <section className={styles.recipeInput}>
        <label htmlFor="ingredients">
          <span> Ingredients</span>
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            defaultValue={''}
          // how to add search
          />

        </label>
        <label htmlFor="quantity">
          <span> Quantity</span>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min={0}
            defaultValue={0}
          />
        </label>
        <label htmlFor="unit">
          <span> Unit</span>
          <input
            type="text"
            name="unit"
            id="unit"
            defaultValue={''}
          // how to sync with ingredient search
          />
        </label>

      </section>
    </table>
  );
};

export default RecipeIngredientsInput;
