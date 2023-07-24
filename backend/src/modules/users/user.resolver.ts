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
  async users() {
    return this.usersRepository.find({ relations: ['friends'] });
  }

  @Query((returns) => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }
  @Mutation(() => User)
  async createUser(@Args('data') data: UserInput) {
    return await this.userService.createUser(data);
  }

  @Mutation(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {
    return await this.userService.validateUser(email, password);
  }

  @Mutation(() => User)
  async addFriend(@Args('data') data: AddFriendInput): Promise<User | null> {
    return await this.userService.addFriend(data);
  }
}
