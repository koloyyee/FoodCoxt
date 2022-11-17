import {NextApiRequest, NextApiResponse} from 'next';
import {SupplierInterface} from '../../../interfaces/supplier.interface';
import prisma from '../../../lib/prisma';

// eslint-disable-next-line require-jsdoc
export default async function handler(
    req: NextApiRequest, res: NextApiResponse <SupplierInterface>,
) {
  const body: SupplierInterface = req.body;

  const data = await prisma.supplier.create({
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,

    },
  });
  res.json(data);
}

