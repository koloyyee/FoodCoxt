/* eslint-disable require-jsdoc */
import {NextApiRequest, NextApiResponse} from 'next';
import {SupplierInterface} from '../../../../interfaces/supplier.interface';


async function handler(
    req: NextApiRequest, res: NextApiResponse<SupplierInterface>) {
  const body = req.body;
  try {
    const result = await prisma.supplier.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });
    return res.json(result);
  } catch (e) {
    console.error(e);
  }
}


export default handler;
