import { Field, Int, ObjectType } from 'type-graphql';
import { Post } from '../post/post.typedefs';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  bio: string;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  email?: string;

  @Field()
  fullName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Profile)
  profile: Profile;

  @Field(() => [Post])
  posts: Post[];
}
