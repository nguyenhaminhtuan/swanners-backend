import { Args, Mutation, Query, Resolver } from 'type-graphql';
import { User } from './user.typedefs';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me() {
    return null;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Args() args: any) {
    console.log(args);
    return null;
  }

  @Mutation(() => User, { nullable: true })
  async register(@Args() args: any) {
    console.log(args);
    return null;
  }
}
