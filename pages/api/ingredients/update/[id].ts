/* eslint-disable require-jsdoc */
import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../../lib/prisma';

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse) {
  if (!req.query.id) return '';
  const ingredientId = parseInt(req.query.id[0]);

  const body= req.body;

  const supplier = await prisma.supplier.findUnique({
    where: {
      name: body.supplier.name,
    },
  });
  const unit = await prisma.unit.findUnique({
    where: {
      name: body.unit.name,
    },
  });
  const category = await prisma.category.findUnique({
    where: {
      name: body.category.name,
    },
  });

  const result = await prisma.ingredient.update({
    where: {
      id: ingredientId,
    },
    data: {
      code: body.code,
      name: body.name,
      packingSize: body.packingSize,
      price: parseFloat(body.price),
      quantity: body.quantity,
      categoryId: category?.id,
      supplierId: supplier?.id,
      unitId: unit?.id,
    },
  });

  res.json(result);
}
