import DataLoader from 'dataloader';
import db from '../db';
import { PaginateLoader } from '.';
import { Post } from '@prisma/client';
import loGroupBy from 'lodash/groupBy';

const postLoader = {
  getPostsByUserId: new DataLoader<PaginateLoader, Post[]>(async (params) => {
    const ids = params.map((param) => param.id);
    const posts = await db.post.findMany({
      where: { userId: { in: ids } },
    });
    const postsByAuthorId = loGroupBy(posts, (post) => post.userId);

    return ids.map((id) => postsByAuthorId[id]);
  }),
};

export default postLoader;
