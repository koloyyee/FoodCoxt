/* eslint-disable no-undef */
declare global {
    // eslint-disable-next-line no-var, no-unused-vars
    var prisma: PrismaClient;
  }
import {PrismaClient} from '@prisma/client';


if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
