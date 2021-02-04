import { Mutation, Query, Resolver } from 'type-graphql';
import { User } from './user.typedefs';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me() {
    return null;
  }

  @Mutation(() => User, { nullable: true })
  async login() {
    return null;
  }

  @Mutation(() => User, { nullable: true })
  async register() {
    return null;
  }
}
