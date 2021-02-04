import { Query, Resolver } from 'type-graphql';
import { Post } from './post.typedefs';

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  async posts() {
    return [];
  }
}
