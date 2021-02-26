import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const db = new PrismaClient({
  log: [
    // { level: 'info', emit: 'stdout' },
    // { level: 'query', emit: 'stdout' },
    // { level: 'warn', emit: 'stdout' },
    { level: 'error', emit: 'event' },
  ],
});

db.$on('error', (event) => {
  logger.app.error(event);
});

export default db;
