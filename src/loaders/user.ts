import DataLoader from 'dataloader';
import db from '../db';
import { User } from '@prisma/client';
import loKeyBy from 'lodash/keyBy';

const userLoader = {
  getUserById: new DataLoader<string, User>(async (ids) => {
    const users = await db.user.findMany({
      where: { id: { in: ids as string[] } },
    });
    const userById = loKeyBy(users, (user) => user.id);

    return ids.map((id) => userById[id]);
  }),
};

export default userLoader;
