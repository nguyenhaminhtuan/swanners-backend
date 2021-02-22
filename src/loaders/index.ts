import userLoader from './user';
import postLoader from './post';

export interface PaginateLoader {
  id: string;
  limit: number;
  offset: number;
}

export default {
  ...userLoader,
  ...postLoader,
};
