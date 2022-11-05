import {GetStaticProps} from 'next';
import ItemCard from '../../components/ItemCard';
import {IngredientsInterface} from '../../interfaces/ingredient.interface';
import prisma from '../../lib/prisma';

const emptyState: IngredientsInterface ={
  code: '',
  name: '',
  packingSize: '',
  price: 0,
  quantity: 0,
  unit: {name: ''},
  category: {name: ''},
  supplier: {name: ''},
};

const CreateIngredient = (
    {units, suppliers, categories}
    : {
        units:IngredientsInterface['unit'][],
        suppliers:IngredientsInterface['supplier'][],
        categories:IngredientsInterface['category'][],
    },
) => {
  return (
    <ItemCard
      ingredient={emptyState}
      units={units}
      suppliers={suppliers}
      categories={categories}
      isNew={true}

    />
  );
};

export default CreateIngredient;

export const getStaticProps: GetStaticProps =async ()=>{
  const unit = await prisma.unit.findMany();
  const supplier = await prisma.supplier.findMany();
  const category = await prisma.category.findMany();

  return {
    props: {
      units: JSON.parse(JSON.stringify(unit)),
      suppliers: JSON.parse(JSON.stringify(supplier)),
      categories: JSON.parse(JSON.stringify(category)),
    },
  };
};
