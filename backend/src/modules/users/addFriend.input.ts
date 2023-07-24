import { Field, InputType, ID } from '@nestjs/graphql';
@InputType()
export class AddFriendInput {
  @Field((type) => ID)
  userId: number;

  @Field((type) => ID)
  friendId: number;
}
