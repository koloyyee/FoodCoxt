import {GetServerSideProps} from 'next';
import IngredientCard from '../components/IngredientCard';
import {IngredientsInterface} from '../interfaces/ingredient.interface';
import prisma from '../lib/prisma';

const Ingredient= (
    {ingredient, units, suppliers, categories, types}: {
      ingredient:IngredientsInterface,
      units:IngredientsInterface['unit'][],
      suppliers:IngredientsInterface['supplier'][],
      categories:IngredientsInterface['category'][],
      types:IngredientsInterface['type'][],
    },
) => {
  return (
    <IngredientCard
      ingredient={ingredient}
      units={units}
      suppliers={suppliers}
      categories={categories}
      types={types}
      isNew={false}
    />
  );
};

export default Ingredient;
export const getServerSideProps: GetServerSideProps =
async ({params}) => {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      category: true,
      supplier: true,
      unit: true,
      type: true,
    },
  });

  const units = await prisma.unit.findMany();
  const suppliers = await prisma.supplier.findMany();
  const categories = await prisma.category.findMany();
  const types = await prisma.type.findMany();

  return {
    props: {
      ingredient: JSON.parse(JSON.stringify(ingredient)),
      units: JSON.parse(JSON.stringify(units)),
      suppliers: JSON.parse(JSON.stringify(suppliers)),
      categories: JSON.parse(JSON.stringify(categories)),
      types: JSON.parse(JSON.stringify(types)),
    },
  };
};
