import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;
}
