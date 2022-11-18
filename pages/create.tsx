import {GetStaticProps} from 'next';
import IngredientCard from '../components/IngredientCard';
import NavDrawer from '../components/NavDrawer';
import {IngredientsInterface} from '../interfaces/ingredient.interface';
import prisma from '../lib/prisma';

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

const CreateIngredient = (
    {units, suppliers, categories, types}
    : {
        units:IngredientsInterface['unit'][],
        suppliers:IngredientsInterface['supplier'][],
        categories:IngredientsInterface['category'][],
        types:IngredientsInterface['type'][],
    },
) => {
  return (
    <div className='main'>
      <NavDrawer />
      <IngredientCard
        ingredient={emptyState}
        units={units}
        suppliers={suppliers}
        categories={categories}
        types={types}
        isNew={true}

      />
    </div>
  );
};

export default CreateIngredient;

export const getStaticProps: GetStaticProps =async ()=>{
  const unit = await prisma.unit.findMany();
  const supplier = await prisma.supplier.findMany();
  const category = await prisma.category.findMany();
  const type = await prisma.type.findMany();

  return {
    props: {
      units: JSON.parse(JSON.stringify(unit)),
      suppliers: JSON.parse(JSON.stringify(supplier)),
      categories: JSON.parse(JSON.stringify(category)),
      types: JSON.parse(JSON.stringify(type)),
    },
  };
};
