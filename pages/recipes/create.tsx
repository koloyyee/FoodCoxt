import {GetStaticProps} from 'next';
import FoodCostCard from '../../components/FoodCostCard';
import NavDrawer from '../../components/NavDrawer';
import {IngredientsInterface} from '../../interfaces/ingredient.interface';
import prisma from '../../lib/prisma';
import styles from '../../styles/RecipeTabs.module.css';

const Recipes = ({ingredients, units, suppliers, categories, types}:{
  ingredients : IngredientsInterface[]
  units: IngredientsInterface['unitId'][]
  suppliers: IngredientsInterface['supplierId'][]
  categories: IngredientsInterface['categoryId'][]
  types: IngredientsInterface['typeId'][]
}) => {
  return (
    <div className='main'>

      <NavDrawer/>
      <div className="container">
        <div className={`${styles.tabs}` }>
          <div className={styles.tabGroup}>
            <input
              defaultChecked
              id="tab1"
              name="tab"
              type="radio"
              value="Tab 1"
              className={styles.tab}
            />
            <label htmlFor="tab1">Food Cost</label>
            <input
              className={styles.tab}
              id="tab2"
              name="tab"
              type="radio"
              value="Tab 2" />
            <label htmlFor="tab2">Operational Cost</label>
            <input
              className={styles.tab}
              id="tab3"
              name="tab"
              type="radio"
              value="Tab 3" />
            <label htmlFor="tab3">Product Cost</label>
          </div>
          <div className={styles.tabPanel} data-tab="Tab 1">
            <h2 className="text-3xl">Food Cost </h2>
            <FoodCostCard
              ingredients={ingredients}
              units={units}
              suppliers={suppliers}
              categories={categories}
              types={types}
            />
          </div>
          <div className={styles.tabPanel} data-tab="Tab 2">
            <h2 className="text-3xl"> Operational Cost</h2>
            <p>
              Labour Cost + Utility Cost
            </p>
          </div>
          <div className={styles.tabPanel} data-tab="Tab 3">
            <h2 className="text-3xl">Total Cost</h2>
            <p>
              food cost + labour cost =
              Total Cost
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;

export const getStaticProps: GetStaticProps= async ()=>{
  const ingredients = await prisma.ingredient.findMany();
  const units = await prisma.unit.findMany();
  const suppliers = await prisma.supplier.findMany();
  const categories = await prisma.category.findMany();
  const types = await prisma.type.findMany();

  return {
    props: {
      ingredients: JSON.parse(JSON.stringify(ingredients)),
      units: JSON.parse(JSON.stringify(units)),
      suppliers: JSON.parse(JSON.stringify(suppliers)),
      types: JSON.parse(JSON.stringify(types)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};
