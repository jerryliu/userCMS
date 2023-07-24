import { Int, Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserInput, AddFriendInput } from './user.input';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userService: UserService
  ) {}
  @Query(() => [User])
  users() {
    return this.usersRepository.find({ relations: ['friends'] });
  }

  @Query((returns) => User, { name: 'user', nullable: true })
  getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }
  @Mutation(() => User)
  createUser(@Args('data') data: UserInput) {
    return this.userService.createUser(data);
  }

  @Mutation(() => User)
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.validateUser(email, password);
  }

  @Mutation(() => User)
  addFriend(@Args('data') data: AddFriendInput): Promise<User | null> {
    return this.userService.addFriend(data);
  }
}
