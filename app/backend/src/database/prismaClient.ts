import { PrismaClient } from '@prisma/client';


export const prismaClient =new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
});