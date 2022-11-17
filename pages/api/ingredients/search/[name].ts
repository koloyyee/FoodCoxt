import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../../../../lib/prisma';

// eslint-disable-next-line require-jsdoc
export default async function handler(
    req: NextApiRequest, res: NextApiResponse,
) {
  const name = req.body;
  const query = await prisma.$queryRawUnsafe(`
  SELECT * FROM "Ingredient" WHERE name ILIKE $1`, `%${name}%`);

  return res.json(query);
}
