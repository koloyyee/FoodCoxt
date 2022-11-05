import {GetServerSideProps} from 'next';
import ItemCard from '../../components/ItemCard';
import {IngredientsInterface} from '../../interfaces/ingredient.interface';
import prisma from '../../lib/prisma';

const IngredientCard = (
    {ingredient, units, suppliers, categories}: {
      ingredient:IngredientsInterface,
      units:IngredientsInterface['unit'][],
      suppliers:IngredientsInterface['supplier'][],
      categories:IngredientsInterface['category'][],
    },
) => {
  return (
    <ItemCard
      ingredient={ingredient}
      units={units}
      suppliers={suppliers}
      categories={categories}
      isNew={false}
    />
  );
};

export default IngredientCard;
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
    },
  });

  const units = await prisma.unit.findMany();
  const suppliers = await prisma.supplier.findMany();
  const categories = await prisma.category.findMany();

  return {
    props: {
      ingredient: JSON.parse(JSON.stringify(ingredient)),
      units: JSON.parse(JSON.stringify(units)),
      suppliers: JSON.parse(JSON.stringify(suppliers)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};
