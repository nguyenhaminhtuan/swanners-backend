import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  log: [
    { level: 'info', emit: 'stdout' },
    { level: 'query', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
    { level: 'error', emit: 'stdout' },
  ],
});

export default db;
