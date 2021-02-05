import { AuthenticationError } from 'apollo-server-express';
import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { LoginInput } from './input/login.input';
import { User } from './user.typedefs';
import { compare } from 'bcrypt';

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me() {
    return null;
  }

  @Mutation(() => User, { nullable: true })
  async login(@Args() args: LoginInput, @Ctx() { prisma }: Context) {
    const user = await prisma.user.findUnique({ where: { email: args.email } });

    if (!user || !user.password) {
      throw new AuthenticationError('');
    }

    const isMatchPassword = await compare(args.password, user.password);

    if (!isMatchPassword) {
      throw new AuthenticationError('');
    }

    return user;
  }

  // @Mutation(() => User, { nullable: true })
  // async register(@Args() args: any) {
  //   console.log(args);
  //   return null;
  // }
}
