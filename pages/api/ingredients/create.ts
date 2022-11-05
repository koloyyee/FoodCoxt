import {NextApiRequest, NextApiResponse} from 'next/types';
import {IngredientsInterface} from '../../../interfaces/ingredient.interface';
import prisma from '../../../lib/prisma';
/**
 *
 * @param {NextApiRequest} req
 * @param { NextApiResponse<IngredientsInterface[]>} res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IngredientsInterface[]>) {
  const body = req.body;
  console.log(body);

  const supplier = await prisma.supplier.findUnique({
    where: {
      name: body.supplier,
    },
  });
  const unit = await prisma.unit.findUnique({
    where: {
      name: body.unit,
    },
  });
  const category = await prisma.category.findUnique({
    where: {
      name: body.category,
    },
  });


  const result = await prisma.ingredient.create({
    data: {
      code: body.code,
      name: body.name,
      packingSize: body.packingSize,
      price: parseFloat(body.price),
      quantity: body.quantity,
      categoryId: category!.id,
      supplierId: supplier!.id,
      unitId: unit!.id,

    },
  });
  res.json(result);
}
