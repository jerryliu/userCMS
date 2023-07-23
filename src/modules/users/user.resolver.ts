import { Int, Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserInput } from './user.input';
import { UserService } from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly userService: UserService // @Inject(forwardRef(() => TeamService)) // private readonly teamService: TeamService,
  ) {}
  @Query(() => [User])
  async users() {
    return this.usersRepository.find({ relations: ['friends'] });
  }

  // @Query((returns) => [User], { name: 'users', nullable: false })
  // async getUsers() {
  //   return this.userService.findAll();
  // }

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
}
