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
  async createUser(@Args('input') input: UserInput) {
    const friends = input.friendIds
      ? await this.usersRepository.findBy({
          id: In(input.friendIds),
        })
      : [];
    const user = this.usersRepository.create({
      ...input,
      friends,
    });
    return this.usersRepository.save(user);
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
    let user = await this.usersRepository.findOne({
      where: {
        id: data.userId,
      },
      relations: ['friends'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    // get the friend from database
    let friend = await this.usersRepository.findOne({
      where: { id: data.friendId },
    });
    if (!friend) {
      throw new Error('Friend not found');
    }

    // check if this friend already exists in user's friends list
    if (user.friends.some((existingFriend) => existingFriend.id == friend.id)) {
      throw new Error('This user is already a friend');
    }

    user.friends = [...user.friends, friend];
    // // save updated user
    user = await this.usersRepository.save(user);

    return user;
  }
}
